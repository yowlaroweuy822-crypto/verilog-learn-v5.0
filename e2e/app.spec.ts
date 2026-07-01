import { expect, test } from '@playwright/test';

test('homepage renders and continues to the recommended task', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'VerilogLearn' })).toBeVisible();
  await page.getByRole('link', { name: /继续学习/ }).click();
  await expect(page).toHaveURL(/#\/micro\/m1/);
});

test('tutorial navigation works', async ({ page }) => {
  await page.goto('/#/tutorial/ch1/0');
  await expect(page.getByRole('heading', { name: /什么是 Verilog/ })).toBeVisible();
  await page.locator('.chapter-nav').getByRole('link', { name: '1.2 Verilog 在数字芯片设计流程中的位置 →' }).click();
  await expect(page).toHaveURL(/#\/tutorial\/ch1\/1/);
});

test('micro exercise hints and completion toggle work', async ({ page }) => {
  await page.goto('/#/micro/m1');
  await page.getByRole('button', { name: '💡 思路提示' }).click();
  await expect(page.locator('.hint-content')).toBeVisible();
  await page.getByRole('button', { name: '查看参考答案' }).click();
  await expect(page.locator('.ans-label')).toHaveText('✓ 参考答案');
  await page.getByRole('button', { name: '标记为已完成' }).click();
  await expect(page.getByRole('button', { name: '✓ 已完成' })).toBeVisible();
});

test('bug and waveform single pages are not blank', async ({ page }) => {
  await page.goto('/#/bug/b1');
  await expect(page.getByRole('heading', { name: '🐛 Bug Hunt 找错训练' })).toBeVisible();
  await expect(page.locator('pre.bug-code')).toBeVisible();

  await page.goto('/#/waveform/w1');
  await expect(page.getByRole('heading', { name: '📊 波形阅读训练' })).toBeVisible();
  await expect(page.locator('.ex-svg svg')).toBeVisible();
});

test('playground runs without CDN dependencies', async ({ page }) => {
  await page.goto('/#/playground');
  await page.getByRole('button', { name: '▶ 静态检查' }).click();
  await expect(page.getByText('静态分析结果')).toBeVisible();
  await expect(page.getByText(/module 定义/)).toBeVisible();
});

test('global search, dark mode, and copy buttons work', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('全局搜索').fill('UART');
  await expect(page.locator('.search-popover')).toBeVisible();
  await page.locator('.search-result').first().click();
  await expect(page.url()).toContain('#/');

  await page.getByRole('button', { name: '切换到暗色模式' }).click();
  await expect(page.locator('body')).toHaveClass(/dark/);

  await page.goto('/#/micro/m1');
  await page.locator('pre').first().hover();
  await expect(page.getByRole('button', { name: '复制' }).first()).toBeVisible();
});
