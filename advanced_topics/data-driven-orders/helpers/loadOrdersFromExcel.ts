import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import type { OrderRow } from './orderTypes.js';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx') as typeof import('xlsx');

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const xlsxPath = path.join(projectRoot, 'testdata', 'orders.xlsx');

export function loadOrdersFromExcel(): OrderRow[] {
  const workbook = XLSX.readFile(xlsxPath);
  const sheet = workbook.Sheets.Orders;

  if (!sheet) {
    throw new Error('Expected a worksheet named "Orders" in testdata/orders.xlsx');
  }

  return XLSX.utils.sheet_to_json<OrderRow>(sheet, {
    defval: '',
    raw: false
  });
}
