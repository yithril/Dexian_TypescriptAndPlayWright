import type { Locator, Page } from '@playwright/test';

/**
 * Page object for the team standup board (index.html).
 */
export class StandupPage {
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: 'Team standup' });
  }

  get taskList() {
    return this.page.getByRole('list', { name: 'Standup tasks' });
  }

  taskItems() {
    return this.taskList.getByRole('listitem');
  }

  taskByTitle(title: string) {
    return this.taskItems().filter({ hasText: title });
  }

  markDoneButtonForTask(task: Locator) {
    return task.getByRole('button', { name: 'Mark done' });
  }

  statusInTask(task: Locator) {
    return task.locator('.task-status');
  }

  doneStatuses() {
    return this.page.getByText('Done', { exact: true });
  }

  openStatuses() {
    return this.page.getByText('Open', { exact: true });
  }

  async goto() {
    await this.page.goto('index.html');
  }
}
