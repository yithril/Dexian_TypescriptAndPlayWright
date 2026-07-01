import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'csv-parse/sync';
import type { OrderRow } from './orderTypes.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const csvPath = path.join(projectRoot, 'testdata', 'orders.csv');

export function loadOrdersFromCsv(): OrderRow[] {
  const content = fs.readFileSync(csvPath, 'utf-8');
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  }) as OrderRow[];
}
