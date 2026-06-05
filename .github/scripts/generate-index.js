#!/usr/bin/env node
// generate-index.js

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const zlib = require("zlib");
const crypto = require("crypto");

const ACTIVITIES_DIR = path.resolve(__dirname, "../../activities");
const GZ_FILE = path.resolve(__dirname, "../../index.json.gz");
const HASH_FILE = path.resolve(__dirname, "../../hash.json");
const REPO_ROOT = path.resolve(__dirname, "../../");

function parseRegisterParserFormat(source) {
  if (!source.includes("registerParser")) return null;

  let capturedConfig = null;

  const mockRegisterParser = (config) => {
    capturedConfig = config;
  };

  const sandbox = {
    registerParser: mockRegisterParser,
    window: {
      registerParser: mockRegisterParser,
    },
    document: {},
    console: { log: () => {}, error: () => {} },
    setTimeout: () => {},
    setInterval: () => {},
    navigator: {},
    location: { href: "http://localhost" },
    Image: function () {},
    Audio: function () {},
  };

  try {
    const script = new vm.Script(source);
    const context = vm.createContext(sandbox);
    script.runInContext(context, { timeout: 1000 });
  } catch (err) {
    try {
      const fallbackSource = `
        const registerParser = ${mockRegisterParser.toString()};
        const window = { registerParser };
        ${source}
      `;
      const fallbackScript = new vm.Script(fallbackSource);
      const fallbackContext = vm.createContext({ console: { log: () => {} } });
      fallbackScript.runInContext(fallbackContext, { timeout: 1000 });
    } catch (_) {}
  }

  if (!capturedConfig) return null;

  const rawDomain = capturedConfig.domain;
  const domain = Array.isArray(rawDomain) ? rawDomain.map((d) => d.trim()).filter(Boolean) : rawDomain ? [rawDomain.trim()] : [];

  const rawUrls = capturedConfig.urlPatterns || [];
  const urlPatterns = rawUrls.map((p) => {
    if (p instanceof RegExp) return `/${p.source}/`;
    let s = String(p).trim();
    if (/^\/.+\/$/.test(s)) return s;
    if (/^\//.test(s)) return s + "/";
    return `/${s}/`;
  });

  const cleanArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val.map((v) => String(v).trim()).filter(Boolean);
    return [String(val).trim()];
  };

  let iframeSelectors = null;
  const rawIframe = capturedConfig.iframeSelectors;
  if (rawIframe !== undefined && rawIframe !== null) {
    if (typeof rawIframe === "object" && !Array.isArray(rawIframe)) {
      if (rawIframe.fields && typeof rawIframe.fields === "object") {
        iframeSelectors = rawIframe;
      } else {
        console.warn(`  ! iframeSelectors missing required "fields" key - skipped`);
      }
    } else {
      console.warn(`  ! iframeSelectors must be a plain object - skipped`);
    }
  }

  return {
    _format: "register-parser",
    _hasVersion: !!capturedConfig.version,
    id: null,
    name: capturedConfig.title || null,
    version: capturedConfig.version || "1.0.0",
    description: capturedConfig.description || "",
    domain: domain,
    urlPatterns: urlPatterns.length ? urlPatterns : ["/.*/"],
    authors: cleanArray(capturedConfig.authors),
    authorsLinks: cleanArray(capturedConfig.authorsLinks),
    homepage: capturedConfig.homepage || "",
    mode: capturedConfig.mode || "listen",
    watchAutoDetect: capturedConfig.watchAutoDetect || "disable",
    category: cleanArray(capturedConfig.category),
    tags: cleanArray(capturedConfig.tags),
    iframeSelectors,
  };
}

function parseMeta(source) {
  return parseRegisterParserFormat(source);
}

function toRelativePath(absPath) {
  return path.relative(REPO_ROOT, absPath).replace(/\\/g, "/");
}

function loadExistingIndex() {
  try {
    if (fs.existsSync(GZ_FILE)) {
      const data = JSON.parse(zlib.gunzipSync(fs.readFileSync(GZ_FILE)).toString("utf8"));
      if (Array.isArray(data)) return Object.fromEntries(data.map((e) => [e.id, e]));
    }
  } catch {}
  return {};
}

function collectScriptFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) {
    console.warn("activities/ not found:", dir);
    return results;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectScriptFiles(full));
    else if (entry.isFile() && (entry.name.endsWith(".js") || entry.name.endsWith(".json"))) results.push(full);
  }
  return results;
}

function generateParserKey(domain, urlPatterns, authors = []) {
  let rawDomain = "";

  if (Array.isArray(domain)) {
    rawDomain = domain[0] || "";
  } else if (typeof domain === "string") {
    rawDomain = domain.split(",")[0] || "";
  }

  if (!rawDomain) rawDomain = "unknown";

  let patternsArray = [];

  if (Array.isArray(urlPatterns)) {
    patternsArray = urlPatterns;
  } else if (typeof urlPatterns === "string") {
    patternsArray = urlPatterns.split(",");
  }

  if (!patternsArray.length) {
    patternsArray = [".*"];
  }

  const patternStrings = patternsArray
    .map((p) => {
      if (!p) return ".*";
      if (p instanceof RegExp) return p.source;
      return p.toString().trim() || ".*";
    })
    .sort();

  const hash = btoa(patternStrings.join("|"))
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 10);

  const author = Array.isArray(authors) ? authors[0] : authors;

  const safeAuthor = String(author)
    .toLowerCase()
    .replace(/[^a-z0-9_\-]/g, "");

  const safeDomain = String(rawDomain)
    .toLowerCase()
    .replace(/[^a-z0-9_.\-]/g, "");

  return safeAuthor ? safeAuthor + "_" + safeDomain + "_" + hash : safeDomain + "_" + hash;
}

function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const isVerbose = args.includes("--verbose");
  // --strict  → PR validation mode: any error blocks the whole build
  // (default) → Generate mode: skip broken parsers, publish the rest
  const isStrict = args.includes("--strict");

  const existingMap = loadExistingIndex();
  const scriptFiles = collectScriptFiles(ACTIVITIES_DIR);
  const entries = [];
  const errors = [];
  const warnings = [];

  if (!scriptFiles.length) {
    console.log("activities/ empty.");
    const emptyJson = JSON.stringify([]);
    const emptyGz = zlib.gzipSync(Buffer.from(emptyJson, "utf8"), { level: zlib.constants.Z_BEST_COMPRESSION });
    fs.writeFileSync(GZ_FILE, emptyGz);
    const emptyHash = { sha256: crypto.createHash("sha256").update(emptyJson).digest("hex"), size: 2, gzSize: emptyGz.length, count: 0, generatedAt: new Date().toISOString() };
    fs.writeFileSync(HASH_FILE, JSON.stringify(emptyHash, null, 2) + "\n", "utf8");
    return;
  }

  for (const file of scriptFiles) {
    const relPath = toRelativePath(file);
    let meta = null;
    let fmt = "";

    if (file.endsWith(".json")) {
      try {
        const source = fs.readFileSync(file, "utf8");
        const content = JSON.parse(source);
        const data = Array.isArray(content) ? content[0] : content;

        let iframeSelectors = null;
        if (data.iframeSelectors !== undefined && data.iframeSelectors !== null) {
          if (typeof data.iframeSelectors === "object" && !Array.isArray(data.iframeSelectors)) {
            if (data.iframeSelectors.fields && typeof data.iframeSelectors.fields === "object") {
              iframeSelectors = data.iframeSelectors;
            } else {
              warnings.push({ file: relPath, warn: 'iframeSelectors missing required "fields" key - skipped' });
            }
          } else {
            warnings.push({ file: relPath, warn: "iframeSelectors must be a plain object - skipped" });
          }
        }

        meta = {
          _format: "json-config",
          id: data.id || null,
          name: data.title || null,
          version: data.version || "1.0.0",
          description: data.description || "",
          domain: Array.isArray(data.domain) ? data.domain : data.domain ? [data.domain] : [],
          urlPatterns: data.urlPatterns && data.urlPatterns.length ? data.urlPatterns : ["/.*/"],
          authors: data.authors || [],
          authorsLinks: data.authorsLinks || [],
          homepage: data.homepage || "",
          mode: data.mode || "listen",
          watchAutoDetect: data.watchAutoDetect || "disable",
          category: Array.isArray(data.category) ? data.category : data.category ? [data.category] : [],
          tags: data.tags || [],
          iframeSelectors,
        };
        fmt = "[JSON Config] ";
      } catch (err) {
        errors.push({ file: relPath, error: "Could not read or parse JSON: " + err.message });
        continue;
      }
    } else {
      try {
        const source = fs.readFileSync(file, "utf8");
        meta = parseMeta(source);
        fmt = meta?._format === "register-parser" ? "[registerParser]" : "[UserScript]  ";
      } catch (err) {
        errors.push({ file: relPath, error: "Could not be read: " + err.message });
        continue;
      }
    }

    if (!meta) {
      errors.push({ file: relPath, error: "Format not recognized" });
      console.warn(" ? Format unknown:", relPath);
      continue;
    }

    // Mandatory field checks
    // strictOnly: true  → error only in --strict mode (PR), warn-and-skip in generate mode
    // warnOnly: true    → never an error, always just a warning in both modes
    const REQUIRED_FIELDS = [
      {
        label: "@name / title",
        check: (m) => !!m.name,
      },
      {
        label: "@domain",
        check: (m) => Array.isArray(m.domain) && m.domain.length > 0,
      },
      {
        label: "@author / authors",
        check: (m) => Array.isArray(m.authors) && m.authors.length > 0,
      },
      {
        label: "@version",
        check: (m) => (m._format === "userscript-block" ? true : !!m._hasVersion),
        warnOnly: true,
        warn: "No version found, 1.0.0 assumed. Add explicit 'version' field.",
      },
      {
        label: "@category",
        check: (m) => !!m.category,
        strictOnly: true,
        warn: "@category missing - parser will be published without a category.",
      },
    ];

    const fieldErrors = [];

    for (const rule of REQUIRED_FIELDS) {
      if (!rule.check(meta)) {
        if (rule.warnOnly) {
          warnings.push({ file: relPath, warn: rule.warn || `${rule.label} missing` });
        } else if (rule.strictOnly) {
          if (isStrict) {
            fieldErrors.push(rule.label);
          } else {
            warnings.push({ file: relPath, warn: rule.warn || `${rule.label} missing` });
          }
        } else {
          fieldErrors.push(rule.label);
        }
      }
    }

    if (fieldErrors.length) {
      const msg = `Missing required fields: ${fieldErrors.join(", ")}`;
      errors.push({ file: relPath, error: msg });
      console.warn(` ! ${relPath}\n     → ${msg}`);
      continue;
    }

    const id = meta.id || generateParserKey(meta.domain, meta.urlPatterns, meta.authors);
    const existing = existingMap[id];

    if (!existing) console.log(` + New:       ${fmt} ${relPath}  v${meta.version}`);
    else if (existing.version !== meta.version) console.log(` ^ Updated:${fmt} ${relPath}  ${existing.version} -> v${meta.version}`);
    else console.log(` = It hasn't changed:  ${fmt} ${relPath}  v${meta.version}`);

    // Build entry - iframeSelectors only included when present
    const entry = {
      id,
      title: meta.name,
      version: meta.version,
      description: meta.description,
      domain: meta.domain.length === 1 ? meta.domain[0] : meta.domain,
      urlPatterns: meta.urlPatterns,
      authors: meta.authors,
      authorsLinks: meta.authorsLinks,
      homepage: meta.homepage,
      mode: meta.mode,
      watchAutoDetect: meta.watchAutoDetect,
      category: meta.category,
      tags: meta.tags,
      file: relPath,
    };

    if (meta.iframeSelectors) {
      entry.iframeSelectors = meta.iframeSelectors;
    }

    entries.push(entry);
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));

  // 1. Write minified + gzipped index.json.gz
  const minifiedJson = JSON.stringify(entries);
  const gzipped = zlib.gzipSync(Buffer.from(minifiedJson, "utf8"), { level: zlib.constants.Z_BEST_COMPRESSION });
  fs.writeFileSync(GZ_FILE, gzipped);

  // 2. Write hash.json
  const contentHash = crypto.createHash("sha256").update(minifiedJson).digest("hex");
  const hashObj = {
    sha256: contentHash,
    size: minifiedJson.length,
    gzSize: gzipped.length,
    count: entries.length,
    generatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(HASH_FILE, JSON.stringify(hashObj, null, 2) + "\n", "utf8");

  console.log("\n-------------------------------------------");

  if (isStrict) {
    console.log(`MODE strict  (--strict)`);
  } else {
    console.log(`MODE generate (lenient)`);
  }

  console.log("OK   " + entries.length + " script -> index.json.gz");
  console.log("GZ   " + gzipped.length + " bytes -> index.json.gz  (ratio: " + ((1 - gzipped.length / minifiedJson.length) * 100).toFixed(1) + "% smaller)");
  console.log("HASH " + contentHash.slice(0, 16) + "... -> hash.json");

  if (warnings.length) {
    console.log("WARN " + warnings.length + " Warning:");
    warnings.forEach((w) => console.log("   !", w.file + ":", w.warn));
  }

  if (errors.length) {
    console.log((isStrict ? "ERR  " : "SKIP ") + errors.length + (isStrict ? " Error - build blocked:" : " Parser(s) skipped:"));
    errors.forEach((e) => console.log("   *", e.file + ":", e.error));

    if (isStrict) {
      // PR validation: any error is fatal
      console.log("-------------------------------------------");
      process.exit(1);
    } else {
      // Generate mode: only fatal if ALL parsers failed
      if (entries.length === 0) {
        console.log("ERR  No valid parsers found - index.json.gz not updated.");
        console.log("-------------------------------------------");
        process.exit(1);
      }
      console.log(`     (${entries.length} valid parser(s) published normally)`);
    }
  }

  console.log("-------------------------------------------");
}

main();
