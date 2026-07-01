import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const csvPath = path.join(projectRoot, 'testdata', 'orders.csv');
const xlsxPath = path.join(projectRoot, 'testdata', 'orders.xlsx');

const rows = parse(fs.readFileSync(csvPath, 'utf-8'), {
  columns: true,
  skip_empty_lines: true,
  trim: true
});

const workbook = XLSX.utils.book_new();
const sheet = XLSX.utils.json_to_sheet(rows);
XLSX.utils.book_append_sheet(workbook, sheet, 'Orders');
XLSX.writeFile(workbook, xlsxPath);

console.log(`Wrote ${rows.length} rows to ${xlsxPath}`);
