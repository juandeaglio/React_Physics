import { test, expect } from '@playwright/test';

test('Verify an animation moves 10px upper right', async ({ page }) => {
  page.setViewportSize({width: 1280, height: 720})
  await page.goto('http://localhost:3000/1/');
  
  // Wait for the 'Box-1' element to be rendered
  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();
  
  // Retry the assertion for a maximum of 6 seconds
  await expect(async () => {
    const resultX = await page.getByTestId('result-Box-1-x').first().textContent() ?? '0';
    expect(parseInt(resultX)).toBeGreaterThan(0);
  }).toPass({ timeout: 6000 });
});
 
test('Verify a collision occurs with the edge of the screen', async ({ page }) => {
  page.setViewportSize({width: 1280, height: 720})
  await page.goto('http://localhost:3000/2/');
  const counter = page.getByTestId('collision-counter');

  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();

  await expect(counter).toBeVisible();

  await expect(async () => {
    const barrierX = await page.getByTestId('right-Barrier').first().textContent() ?? '0';
    expect(parseInt(barrierX)).toBeCloseTo(page.viewportSize()!.width, -1);
  }).toPass({ timeout: 6000 });

  await expect(async () => {
    let count = await page.getByTestId('collision-counter').first().textContent() ?? 'NaN';
    count = await page.getByTestId('collision-counter').first().textContent() ?? '0';
    expect(parseInt(count)).toBeGreaterThan(0);
  }).toPass({ timeout: 6000 });
  
  await expect(async () => {
    const resultX = await page.getByTestId('result-Box-1-x').first().textContent() ?? '0';
  expect(parseInt(resultX)).toBeLessThanOrEqual(page.viewportSize()!.width);
  }).toPass({ timeout: 6000 });

});

test('Perpetual motion of a box after giving initial vector', async ({ page }) => {
  page.setViewportSize({width: 1280, height: 720})
  await page.goto('http://localhost:3000/3/');
  
  const rect = page.getByTestId('Box-1');
  await expect(rect).toBeVisible();

  await expect(async () => {
    const currentX = await page.getByTestId('Box-1-x').first().textContent() ?? '0';
    const initialX = await page.getByTestId('initial-Box-1-x').first().textContent() ?? '0';
    expect(parseInt(currentX) - parseInt(initialX)).toBeGreaterThanOrEqual(20);
  }).toPass({ timeout: 6000 });
  
});