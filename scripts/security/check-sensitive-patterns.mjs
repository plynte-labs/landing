#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const ignoredDirectories = new Set([
  '.git',
  'node_modules',
  'dist',
  '.astro',
  '.vercel',
  '.turbo',
  '.cache',
]);

const scannedExtensions = new Set([
  '.astro',
  '.css',
  '.cjs',
  '.env',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.mjs',
  '.toml',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
]);

const allowedFileNames = new Set([
  '.env.example',
  '.env.sample',
  '.env.template',
]);

const ignoredFiles = new Set([
  'scripts/security/check-sensitive-patterns.mjs',
]);

const checks = [
  {
    name: 'Windows user path',
    pattern: /\b[A-Za-z]:[\\/]Users[\\/][^\s"'`<>]+/g,
  },
  {
    name: 'Local workspace path',
    pattern: /\b[A-Za-z]:[\\/](?:Job|Projects|Workspace|Users)[\\/][^\s"'`<>]+/g,
  },
  {
    name: 'Unix home path',
    pattern: /(?:^|[\s"'`=])\/(?:Users|home)\/[^\s"'`<>]+/g,
  },
  {
    name: 'Private key block',
    pattern: /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----/g,
  },
  {
    name: 'OpenSSH private key block',
    pattern: /-----BEGIN OPENSSH PRIVATE KEY-----/g,
  },
];

const findings = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.relative(root, absolutePath).replaceAll(path.sep, '/');

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await walk(absolutePath);
      }
      continue;
    }

    if (!entry.isFile()) continue;
    if (ignoredFiles.has(relativePath)) continue;

    const extension = path.extname(entry.name);
    const basename = path.basename(entry.name);

    if (basename.startsWith('.env') && !allowedFileNames.has(basename)) {
      findings.push({
        file: relativePath,
        line: 1,
        rule: 'Committed environment file',
        value: basename,
      });
      continue;
    }

    if (!scannedExtensions.has(extension)) continue;

    const fileStats = await stat(absolutePath);
    if (fileStats.size > 1024 * 1024) continue;

    const content = await readFile(absolutePath, 'utf8');

    for (const check of checks) {
      check.pattern.lastIndex = 0;
      let match;
      while ((match = check.pattern.exec(content)) !== null) {
        const before = content.slice(0, match.index);
        const line = before.split(/\r?\n/).length;
        const value = match[0].trim();

        findings.push({
          file: relativePath,
          line,
          rule: check.name,
          value: value.length > 120 ? `${value.slice(0, 117)}...` : value,
        });
      }
    }
  }
}

await walk(root);

if (findings.length > 0) {
  console.error('Sensitive pattern check failed. Review these findings:');
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} [${finding.rule}] ${finding.value}`);
  }
  process.exit(1);
}

console.log('Sensitive pattern check passed.');
