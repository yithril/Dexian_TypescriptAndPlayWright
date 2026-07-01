import { test, expect } from '../fixtures/standupTest.js';

/**
 * These tests use standupPage — a dependent fixture that chains off loginPage,
 * performs mock login, and hands off StandupPage already on the board.
 * See fixtures/standupTest.ts.
 */
test.describe('Team standup board', () => {
  test('loads with three open tasks', async ({ standupPage }) => {
    await expect(standupPage.heading).toBeVisible();
    await expect(standupPage.taskItems()).toHaveCount(3);
    await expect(standupPage.openStatuses()).toHaveCount(3);
  });

  test('marks the first task done', async ({ standupPage }) => {
    const task = standupPage.taskByTitle('Review pull requests');
    await standupPage.markDoneButtonForTask(task).click();

    await expect(standupPage.statusInTask(task)).toHaveText('Done');
    await expect(standupPage.openStatuses()).toHaveCount(2);
  });

  test('marks two tasks done', async ({ standupPage }) => {
    const taskOne = standupPage.taskByTitle('Review pull requests');
    const taskTwo = standupPage.taskByTitle('Update test documentation');

    await standupPage.markDoneButtonForTask(taskOne).click();
    await standupPage.markDoneButtonForTask(taskTwo).click();

    await expect(standupPage.doneStatuses()).toHaveCount(2);
    await expect(standupPage.openStatuses()).toHaveCount(1);
  });
});
