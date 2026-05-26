import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const [, , url, outputPath, fullPageArg] = process.argv;

if (!url || !outputPath) {
  console.error('Usage: node scripts/capture-project.mjs <url> <output-path> [--full]');
  process.exit(1);
}

const fullPage = fullPageArg === '--full';
const absoluteOutput = resolve(outputPath);

await mkdir(dirname(absoluteOutput), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

console.log(`Navigating to ${url}...`);
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);

await page.screenshot({ path: absoluteOutput, fullPage });
console.log(`Saved: ${absoluteOutput}`);

await browser.close();
