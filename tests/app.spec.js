import { test, expect } from '@playwright/test';

test.describe('Tic Tac Toe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('makes a move and updates board', async ({ page }) => {
    await page.getByRole('button', { name: 'Cell 1' }).click();
    await expect(page.getByTestId('board')).toContainText('X');
    await expect(page.getByTestId('status')).toHaveText("O's turn");
  });

  test('detects X win', async ({ page }) => {
    await page.getByRole('button', { name: 'Cell 1' }).click(); // X
    await page.getByRole('button', { name: 'Cell 4' }).click(); // O
    await page.getByRole('button', { name: 'Cell 2' }).click(); // X
    await page.getByRole('button', { name: 'Cell 5' }).click(); // O
    await page.getByRole('button', { name: 'Cell 3' }).click(); // X wins
    await expect(page.getByTestId('status')).toHaveText('X wins!');
  });

  test('detects draw', async ({ page }) => {
    const moves = [
      { cell: 'Cell 1', player: 'X' },
      { cell: 'Cell 2', player: 'O' },
      { cell: 'Cell 3', player: 'X' },
      { cell: 'Cell 5', player: 'O' },
      { cell: 'Cell 4', player: 'X' },
      { cell: 'Cell 6', player: 'O' },
      { cell: 'Cell 8', player: 'X' },
      { cell: 'Cell 9', player: 'O' },
      { cell: 'Cell 7', player: 'X' },
    ];
    for (const { cell } of moves) {
      await page.getByRole('button', { name: cell }).click();
    }
    await expect(page.getByTestId('status')).toHaveText('Draw!');
  });

  test('reset clears board', async ({ page }) => {
    await page.getByRole('button', { name: 'Cell 1' }).click();
    await page.getByTestId('reset').click();
    await expect(page.getByTestId('board')).toHaveText('');
    await expect(page.getByTestId('status')).toHaveText("X's turn");
  });
});

test('page loads without console errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
  expect(errors).toEqual([]);
});
