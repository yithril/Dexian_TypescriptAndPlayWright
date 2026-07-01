import type { Locator, Page } from '@playwright/test';
import { StandupTaskList } from './standup-task-list.page.js';

/**
 * Page object for the team standup board (index.html).
 * The app redirects here only after login — use LoginPage first, or the
 * standupPage fixture which logs in via the loginPage fixture.
 */
export class StandupPage {
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: 'Team standup' });
  }

  get taskListRoot() {
    return this.page.getByRole('list', { name: 'Standup tasks' });
  }

  get taskList() {
    return new StandupTaskList(this.taskListRoot);
  }

  taskItems() {
    return this.taskList.items();
  }

  taskByTitle(title: string) {
    return this.taskList.byTitle(title);
  }

  markDoneButtonForTask(task: Locator) {
    return this.taskList.markDoneButtonForTask(task);
  }

  statusInTask(task: Locator) {
    return this.taskList.statusInTask(task);
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
