import { test, expect } from '@playwright/test';

test('Verify an animation moves 100px to right', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const rect = page.getByTestId('box-1');
  await expect(rect).toBeVisible();
  const box1X = page.getByTestId('box-1x');
  await page.waitForTimeout(1000);
  const text: string = await box1X.textContent() ?? '';
  const numberStr: string = await text.slice(3).match('\\d*')?.toString() ?? '0';
  const xVal: number = parseInt(numberStr);
  await expect(xVal).toBeCloseTo(100, -1);
});