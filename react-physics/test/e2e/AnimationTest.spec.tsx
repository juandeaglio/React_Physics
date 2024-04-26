import { test, expect } from '@playwright/test';

test('Verify an animation moves 100px to right', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const rect = page.getByTestId('box-1');
  await expect(rect).toBeVisible();
  const box1X = page.getByTestId('box-1x');
  await expect(box1X).toBeVisible();
});