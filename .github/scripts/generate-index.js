#!/usr/bin/env node
// generate-index.js

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SCRIPTS_DIR = path.resolve(__dirname, "../../scripts");
const OUTPUT_FILE = path.resolve(__dirname, "../../index.json");
const REPO_ROOT = path.resolve(__dirname, "../../");

function parseUserScriptBlock(source) {
  const blockMatch = source.match(/\/\/\s*==UserScript==([\s\S]*?)\/\/\s*==\/UserScript==/);
  if (!blockMatch) return null;
  const block = blockMatch[1];
  const lines = block
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const raw = {};
  for (const line of lines) {
    const m = line.match(/^\/\/\s*@(\S+)\s+(.*)/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (!raw[key]) raw[key] = [];
    raw[key].push(val);
  }
  const single = (key, fallback = null) => raw[key]?.[0] ?? fallback;
  const multi = (key) => raw[key] || [];
  return {
    _format: "userscript-block",
    id: single("id"),
    name: single("name"),
    version: single("version", "1.0.0"),
    description: single("description", ""),
    domain: multi("domain"),
    urlPatterns: multi("urlpattern"),
    authors: multi("author"),
    authorsLinks: multi("authorlink"),
    homepage: single("homepage", ""),
    mode: single("mode", "listen"),
    watchAutoDetect: single("watchautodetect", "disable"),
    category: single("category", ""),
    tags: multi("tag"),
  };
}

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
    category: capturedConfig.category || "",
    tags: cleanArray(capturedConfig.tags),
  };
}

function parseMeta(source) {
  return parseUserScriptBlock(source) || parseRegisterParserFormat(source);
}

function generateScriptId(domain, urlPatterns) {
  const d = Array.isArray(domain) ? domain[0] : domain || "";
  const p = Array.isArray(urlPatterns) ? urlPatterns[0] : urlPatterns || ".*";
  return `${d}__${p}`.replace(/[^a-zA-Z0-9_\-.]/g, "_").slice(0, 80);
}

function toRelativePath(absPath) {
  return path.relative(REPO_ROOT, absPath).replace(/\\/g, "/");
}

function loadExistingIndex() {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      const data = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf8"));
      if (Array.isArray(data)) return Object.fromEntries(data.map((e) => [e.id, e]));
    }
  } catch {}
  return {};
}

function collectScriptFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) {
    console.warn("scripts/ not found:", dir);
    return results;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectScriptFiles(full));
    else if (entry.isFile() && (entry.name.endsWith(".js") || entry.name.endsWith(".json"))) results.push(full);
  }
  return results;
}

function main() {
  const existingMap = loadExistingIndex();
  const scriptFiles = collectScriptFiles(SCRIPTS_DIR);
  const entries = [];
  const errors = [];
  const warnings = [];

  if (!scriptFiles.length) {
    console.log("scripts/ empty.");
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([], null, 2) + "\n", "utf8");
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
          category: data.category || "",
          tags: data.tags || [],
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
    if (!meta.name) {
      errors.push({ file: relPath, error: "@name/title required" });
      console.warn(" ! @name/title missing:", relPath);
      continue;
    }
    if (!meta.domain.length) {
      errors.push({ file: relPath, error: "@domain required" });
      console.warn(" ! @domain missing:", relPath);
      continue;
    }

    if ((meta._format === "register-parser" || meta._format === "json-config") && !meta._hasVersion) {
      warnings.push({ file: relPath, warn: "No version, 1.0.0 assumed. Add 'version' to the export/config format." });
    }

    const id = meta.id || generateScriptId(meta.domain, meta.urlPatterns);
    const existing = existingMap[id];

    if (!existing) console.log(` + New:       ${fmt} ${relPath}  v${meta.version}`);
    else if (existing.version !== meta.version) console.log(` ^ Updated:${fmt} ${relPath}  ${existing.version} -> v${meta.version}`);
    else console.log(` = It hasn't changed:  ${fmt} ${relPath}  v${meta.version}`);

    entries.push({
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
    });
  }

  entries.sort((a, b) => a.title.localeCompare(b.title));
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(entries, null, 2) + "\n", "utf8");

  console.log("\n-------------------------------------------");
  console.log("OK   " + entries.length + " script -> index.json");
  if (warnings.length) {
    console.log("WARN " + warnings.length + " Warning:");
    warnings.forEach((w) => console.log("   !", w.file + ":", w.warn));
  }
  if (errors.length) {
    console.log("ERR  " + errors.length + " Skipped:");
    errors.forEach((e) => console.log("   *", e.file + ":", e.error));
    process.exit(1);
  }
  console.log("-------------------------------------------");
}

main();
