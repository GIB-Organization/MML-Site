// VULN-070: dependency audit gate for what ships (the production graph, from the lockfile only, no install needed).
//
// Until the Angular upgrade programme has removed the known findings (docs/dependency-upgrade-runbook.md), the gate is a ratchet:
// it fails when the number of critical or high findings is HIGHER than the committed baseline (audit-baseline.json), so nothing new can
// slip in, and it asks for the baseline to be lowered whenever the count goes down. The target baseline is 0 critical and 0 high.
//
//   node scripts/audit-gate.mjs            check against the baseline
//   node scripts/audit-gate.mjs --write    record the current counts as the new baseline (after an upgrade stage)
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = join(root, 'audit-baseline.json');

function currentCounts() {
  let output;
  try {
    output = execFileSync('npm', ['audit', '--package-lock-only', '--omit=dev', '--json'], { cwd: root, encoding: 'utf8', shell: process.platform === 'win32' });
  } catch (error) {
    // npm audit exits non-zero when it finds something; the report is still on stdout
    output = error.stdout?.toString() ?? '';
    if (!output) throw new Error(`npm audit gave no report: ${error.message}`);
  }
  const report = JSON.parse(output);
  if (report.error) throw new Error(`npm audit failed: ${report.error.summary ?? JSON.stringify(report.error)}`);
  const v = report.metadata.vulnerabilities;
  return { critical: v.critical, high: v.high, moderate: v.moderate, low: v.low };
}

const counts = currentCounts();

if (process.argv.includes('--write')) {
  writeFileSync(baselinePath, JSON.stringify({ critical: counts.critical, high: counts.high }, null, 2) + '\n');
  console.log(`Baseline written: ${counts.critical} critical, ${counts.high} high.`);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
console.log(`Production dependencies: ${counts.critical} critical (baseline ${baseline.critical}), ${counts.high} high (baseline ${baseline.high}), ${counts.moderate} moderate, ${counts.low} low.`);

if (counts.critical > baseline.critical || counts.high > baseline.high) {
  console.error('FAIL: the production dependency tree has more critical or high findings than the baseline. Run `npm audit --omit=dev` to see which package brought them in.');
  process.exit(1);
}
if (counts.critical < baseline.critical || counts.high < baseline.high) {
  console.log('The count went down: run `node scripts/audit-gate.mjs --write` and commit audit-baseline.json to keep the gain.');
}
