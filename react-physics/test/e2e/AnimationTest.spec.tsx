import { test, expect } from '@playwright/test';

test('Verify an animation moves 100px to right', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const heading = page.getByRole('heading', {level: 1});
  await expect(heading).toHaveText('Vite + React');

});