#!/usr/bin/env node
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const TARGET_DIRS = [join(ROOT, 'src'), join(ROOT, '.')];
const INCLUDE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html']);
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.idea', '.vscode']);

function listFiles(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const name of entries) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (EXCLUDE_DIRS.has(name)) continue;
      files.push(...listFiles(full));
    } else {
      if (INCLUDE_EXTS.has(extname(name))) files.push(full);
    }
  }
  return files;
}

// Regex patterns per file type
const blockComment = /\/\*[\s\S]*?\*\//g; // /* ... */
const lineComment = /(^|[^:\\])\/\/.*$/gm; // //... but avoid protocols like http:// (keeps preceding char)
const htmlComment = /<!--([\s\S]*?)-->/g;

function stripCodeComments(code, ext) {
  let out = code;
  if (ext === '.html') {
    out = out.replace(htmlComment, '');
    return out;
  }
  if (ext === '.css') {
    // CSS supports /* ... */ only
    out = out.replace(blockComment, '');
    return out;
  }
  // For JS/TS/JSX/TSX: remove block comments first
  out = out.replace(blockComment, '');
  // Then line comments, but keep map file comments like //# sourceMappingURL (rare in src)
  out = out.replace(/(^|\n)\s*\/\/\s*#\s*sourceMappingURL=.*$/gm, '$1');
  out = out.replace(lineComment, (m, p1) => (p1 === '' ? '' : p1));
  return out;
}

function processFile(file) {
  const ext = extname(file).toLowerCase();
  let before = readFileSync(file, 'utf8');
  const after = stripCodeComments(before, ext);
  if (after !== before) {
    writeFileSync(file, after, 'utf8');
    return true;
  }
  return false;
}

let changed = 0;
for (const base of TARGET_DIRS) {
  try {
    const files = listFiles(base);
    for (const f of files) if (processFile(f)) changed++;
  } catch (_) {}
}

console.log(`Removed comments from ${changed} file(s).`);
