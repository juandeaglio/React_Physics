import { test, expect } from '@playwright/test';

test('Verify an animation moves 10px upper right', async ({ page }) => {
  await page.goto('http://localhost:3000/1/');
  // Wait for the 'Box-1' element to be rendered
  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();
  await page.waitForTimeout(1100);

  const resultX = await page.getByTestId('result-Box-1-x').first().textContent() ?? '0';
  expect(parseInt(resultX)).toBeCloseTo(7.07, -1)
});

 
test('Verify a collision occurs with the edge of the screen', async ({ page }) => {
  await page.goto('http://localhost:3000/2/');
  const counter = page.getByTestId('collision-counter');

  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();

  await expect(counter).toBeVisible();
  await page.waitForTimeout(1100);

  const barrierX = await page.getByTestId('right-Barrier').first().textContent() ?? '0';
  await expect(parseInt(barrierX)).toBeCloseTo(page.viewportSize()!.width, -1);

  let count = await page.getByTestId('collision-counter').first().textContent() ?? 'NaN';
  count = await page.getByTestId('collision-counter').first().textContent() ?? '0';
  expect(parseInt(count)).toBeGreaterThan(0);


  const resultX = await page.getByTestId('result-Box-1-x').first().textContent() ?? '0';
  expect(parseInt(resultX)).toBeLessThanOrEqual(page.viewportSize()!.width);
});