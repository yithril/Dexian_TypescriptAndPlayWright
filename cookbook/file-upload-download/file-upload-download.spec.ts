import { test, expect } from '@playwright/test';
import { BulkUpload } from './file-upload-download.page';

test.describe('File upload + download', () => {
  test('uploading a CSV parses its rows', async ({ page }) => {
    const bulk = new BulkUpload(page);
    await bulk.goto();

    await bulk.uploadCsv('order.csv', 'model,quantity\nS-4612,10\nS-423,5\n');

    await expect(bulk.parsedRows).toHaveCount(2);
    await expect(bulk.parsedCount).toHaveText('2 items parsed');
  });

  test('downloading the template captures the file', async ({ page }) => {
    const bulk = new BulkUpload(page);
    await bulk.goto();

    // Arm the download listener BEFORE the click that triggers it.
    const downloadPromise = page.waitForEvent('download');
    await bulk.downloadTemplate.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe('bulk-order-template.csv');
  });
});
