import type { Locator } from '@playwright/test';

/**
 * Component page object for the standup task list region.
 * Scoped to a root locator so it can be composed inside StandupPage
 * or injected directly via a dependent fixture.
 */
export class StandupTaskList {
  constructor(private readonly root: Locator) {}

  items() {
    return this.root.getByRole('listitem');
  }

  byTitle(title: string) {
    return this.items().filter({ hasText: title });
  }

  markDoneButtonForTask(task: Locator) {
    return task.getByRole('button', { name: 'Mark done' });
  }

  statusInTask(task: Locator) {
    return task.locator('.task-status');
  }

  async markDone(title: string) {
    const task = this.byTitle(title);
    await this.markDoneButtonForTask(task).click();
  }

  doneStatuses() {
    return this.root.getByText('Done', { exact: true });
  }

  openStatuses() {
    return this.root.getByText('Open', { exact: true });
  }
}
