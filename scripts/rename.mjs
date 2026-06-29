#!/usr/bin/env node
/**
 * Rename the template for a new project.
 *
 * Usage:
 *   node scripts/rename.mjs <package-name> [--title "Pretty Title"] [--description "..."]
 *
 * Example:
 *   node scripts/rename.mjs minha-loja --title "Minha Loja" --description "App interno da loja"
 *
 * What it updates:
 *   - package.json         → "name"
 *   - src/app/layout.tsx   → metadata.title / metadata.description
 *   - src/app/styleguide/layout.tsx → sidebar heading (prettified title)
 *   - README.md            → first H1 heading
 *   - scripts/*.sh         → restaura bit de execução (perdido em clones no Windows/WSL)
 */

import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  chmodSync,
  statSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith("-")) {
  console.error(
    "Uso: node scripts/rename.mjs <package-name> [--title \"...\"] [--description \"...\"]"
  );
  process.exit(1);
}

const packageName = args[0];

if (!/^[a-z0-9][a-z0-9-_.]{0,213}$/.test(packageName)) {
  console.error(
    `Nome de pacote inválido: "${packageName}". Use minúsculas, números, '-', '_' ou '.'.`
  );
  process.exit(1);
}

function flag(name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

const prettyTitle =
  flag("--title") ??
  packageName
    .split(/[-_.]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const description =
  flag("--description") ?? `Projeto ${prettyTitle} — gerado a partir do template.`;

function updateFile(relPath, updater) {
  const path = join(ROOT, relPath);
  if (!existsSync(path)) {
    console.warn(`  ! ${relPath} não encontrado, pulando`);
    return false;
  }
  const before = readFileSync(path, "utf8");
  const after = updater(before);
  if (before === after) {
    console.log(`  · ${relPath} sem mudanças`);
    return false;
  }
  writeFileSync(path, after);
  console.log(`  ✓ ${relPath}`);
  return true;
}

console.log(`Renomeando para: ${packageName}`);
console.log(`  título:      ${prettyTitle}`);
console.log(`  descrição:   ${description}`);
console.log("");

updateFile("package.json", (c) => {
  const json = JSON.parse(c);
  json.name = packageName;
  return JSON.stringify(json, null, 2) + "\n";
});

updateFile("src/app/layout.tsx", (c) =>
  c
    .replace(/title:\s*"[^"]*"/, `title: ${JSON.stringify(prettyTitle)}`)
    .replace(
      /description:\s*"[^"]*"/,
      `description: ${JSON.stringify(description)}`
    )
);

updateFile("src/app/styleguide/layout.tsx", (c) =>
  c.replace(
    /(<Link href="\/styleguide" className="text-xl font-bold">\s*)[^<\n]*(\n\s*<\/Link>)/,
    `$1${prettyTitle}$2`
  )
);

updateFile("README.md", (c) => {
  if (c.startsWith("# ")) {
    return c.replace(/^# .+/m, `# ${prettyTitle}`);
  }
  return `# ${prettyTitle}\n\n${c}`;
});

const scriptsDir = join(ROOT, "scripts");
for (const entry of readdirSync(scriptsDir)) {
  if (!entry.endsWith(".sh")) continue;
  const path = join(scriptsDir, entry);
  const mode = statSync(path).mode;
  const withExec = mode | 0o111;
  if (mode === withExec) continue;
  chmodSync(path, withExec);
  console.log(`  ✓ chmod +x scripts/${entry}`);
}

console.log("\nPronto. Rode `npm install` para regenerar o package-lock.json.");
