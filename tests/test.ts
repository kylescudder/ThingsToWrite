import { expect, test } from '@playwright/test';

test('Login form has expected p tag with strap line', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('p')).toBe('A convenient place to store all of your markdown notes.');
});

test('Login/Lougout flow', async ({ page }) => {
	await page.goto('/');
	expect(await page.locator('text=Login with GitHub').click());
	setTimeout(() => {
		expect(page.locator('text=Logout').click());
	}, 2000);
});
