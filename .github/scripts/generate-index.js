#!/usr/bin/env node
// generate-index.js

const fs = require("fs");
const path = require("path");

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
    tags: multi("tag"),
  };
}

function parseRegisterParserFormat(source) {
  if (!source.includes("registerParser(")) return null;
  const extract = (key) => {
    for (const k of [key, key.toLowerCase()]) {
      const m = new RegExp(`\\b${k}\\s*:\\s*["'\`]([^"'\`]*?)["'\`]`).exec(source);
      if (m) return m[1].trim();
    }
    return null;
  };
  const urlRaw = /\burlPatterns\s*:\s*\[([\s\S]*?)\]/.exec(source)?.[1] || "";
  const urlPatterns = urlRaw
    .split(",")
    .map((p) => {
      p = p.trim().replace(/^["'`]|["'`]$/g, "");
      if (!p) return null;
      if (/^\/.+\/$/.test(p)) return p;
      if (/^\//.test(p)) return p + "/";
      return `/${p}/`;
    })
    .filter(Boolean);

  const domain = extract("domain");
  const title = extract("title");
  const version = extract("version");
  const description = extract("description");
  const homepage = extract("homepage");
  const mode = extract("mode");
  const watchAutoDetect = extract("watchAutoDetect");
  const authorsRaw = extract("authors");
  const authorsLinksRaw = extract("authorsLinks");

  if (!domain && !title) return null;

  return {
    _format: "register-parser",
    _hasVersion: !!version,
    id: null,
    name: title || null,
    version: version || "1.0.0",
    description: description || "",
    domain: domain ? [domain] : [],
    urlPatterns: urlPatterns.length ? urlPatterns : ["/.*/"],
    authors: authorsRaw
      ? authorsRaw
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean)
      : [],
    authorsLinks: authorsLinksRaw
      ? authorsLinksRaw
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean)
      : [],
    homepage: homepage || "",
    mode: mode || "listen",
    watchAutoDetect: watchAutoDetect || "disable",
    tags: [],
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
    else if (entry.isFile() && entry.name.endsWith(".js")) results.push(full);
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
    let source;
    try {
      source = fs.readFileSync(file, "utf8");
    } catch (err) {
      errors.push({ file: relPath, error: "Could not be read: " + err.message });
      continue;
    }

    const meta = parseMeta(source);
    const fmt = meta?._format === "register-parser" ? "[registerParser]" : "[UserScript]  ";

    if (!meta) {
      errors.push({ file: relPath, error: "Format not recognized" });
      console.warn(" ? Format unknown:", relPath);
      continue;
    }
    if (!meta.name) {
      errors.push({ file: relPath, error: "@name/title required" });
      console.warn(" ! @name missing:", relPath);
      continue;
    }
    if (!meta.domain.length) {
      errors.push({ file: relPath, error: "@domain required" });
      console.warn(" ! @domain missing:", relPath);
      continue;
    }

    if (meta._format === "register-parser" && meta.version === "1.0.0") {
      warnings.push({ file: relPath, warn: "No version, 1.0.0 assumed. Add 'version' to the export format." });
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
