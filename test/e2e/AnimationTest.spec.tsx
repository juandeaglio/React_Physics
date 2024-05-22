import { test, expect } from '@playwright/test';

test('Verify an animation moves 10px upper right', async ({ page }) => {
  await page.goto('http://localhost:3000/1/');
  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();
  await page.waitForTimeout(1100);

  const resultX = await page.getByTestId('result-Box-1-x').first().textContent() ?? '0';
  expect(parseInt(resultX)).toBeCloseTo(7.07, -1)
});

/*
test('Verify a collision occurs with the edge of the screen', async ({ page }) => {
  await page.goto('http://localhost:3000/2/');
  const counter = page.getByTestId('Collision-Counter');

  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();

  let count = await page.getByTestId('Collision-Counter').first().textContent() ?? 'NaN';
  expect(parseInt(count)).toBe(0);

  await expect(counter).toBeVisible();
  await page.waitForTimeout(1100);

  count = await page.getByTestId('Collision-Counter').first().textContent() ?? '0';
  expect(parseInt(count)).toBeGreaterThan(0);


  const resultX = await page.getByTestId('result-Box-1-x').first().textContent() ?? '0';
  expect(parseInt(resultX)).toBeCloseTo(screen.width, -1)
});*/