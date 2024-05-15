import { test, expect } from '@playwright/test';

test('Verify an animation moves 10px upper right', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();
  await page.waitForTimeout(1100);

  const resultX = await page.getByTestId('result-Box-1-x').first().textContent() ?? '0';
  expect(parseInt(resultX)).toBeCloseTo(7.07, 2)
});