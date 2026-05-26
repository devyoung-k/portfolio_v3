import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const EMAIL = process.env.APIGUARD_EMAIL;
const PASSWORD = process.env.APIGUARD_PASSWORD;
const BASE_URL = 'https://apiguard.devyoung.dev';

if (!EMAIL || !PASSWORD) {
  console.error('Set APIGUARD_EMAIL and APIGUARD_PASSWORD env vars.');
  process.exit(1);
}

const outputPath = resolve('public/images/projects/apiguard.png');
await mkdir(dirname(outputPath), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

console.log('Opening login page...');
await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });

console.log('Filling credentials...');
await page.getByLabel(/email/i).fill(EMAIL);
await page.getByLabel(/password/i).fill(PASSWORD);

console.log('Submitting...');
await Promise.all([
  page.waitForLoadState('networkidle', { timeout: 60000 }),
  page.getByRole('button', { name: /sign in/i }).click(),
]);

await page.waitForTimeout(2500);
console.log(`Final URL: ${page.url()}`);

await page.screenshot({ path: outputPath, fullPage: false });
console.log(`Saved: ${outputPath}`);

await browser.close();
