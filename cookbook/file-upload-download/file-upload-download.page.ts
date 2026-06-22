import { Page, Locator } from '@playwright/test';

/** Page object for the Quick Order bulk-upload box and template download. */
export class BulkUpload {
  readonly fileInput: Locator;
  readonly parsedRows: Locator;
  readonly parsedCount: Locator;
  readonly uploadError: Locator;
  readonly downloadTemplate: Locator;

  constructor(private readonly page: Page) {
    this.fileInput = page.getByTestId('bulk-upload-input');
    this.parsedRows = page.getByTestId('parsed-row');
    this.parsedCount = page.getByTestId('parsed-count');
    this.uploadError = page.getByTestId('bulk-upload-error');
    this.downloadTemplate = page.getByTestId('download-template');
  }

  async goto(): Promise<void> {
    await this.page.goto('/quick-order');
  }

  /** Upload an in-memory CSV without needing a fixture file on disk. */
  async uploadCsv(name: string, contents: string): Promise<void> {
    await this.fileInput.setInputFiles({
      name,
      mimeType: 'text/csv',
      buffer: Buffer.from(contents)
    });
  }
}
