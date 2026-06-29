// Day 1 TypeScript Lab - complete all four parts in this one file.
import { Product } from './product';

/**
 * InventoryItem interface.
 *
 * @interface InventoryItem
 */
interface InventoryItem {
  product: Product;
  quantity: number;
}

/**
 * Array of inventory items.
 *
 * @type {InventoryItem[]}
 */
const inventory: InventoryItem[] = [
  { product: { name: 'motor', price: 10.0 }, quantity: 10 },
  { product: { name: 'sensor', price: 12.5 }, quantity: 4 },
  { product: { name: 'LED', price: 1.0 }, quantity: 20 }
];

/**
 * Calculate the total value of the inventory.
 *
 * @param {InventoryItem[]} inventory
 * @return {*}  {number}
 */
const calcInventoryValue = (inventory: InventoryItem[]): number => {
  if (inventory.length === 0) {
    return 0;
  }

  return inventory.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

console.log(`Total inventory value: $${calcInventoryValue(inventory).toFixed(2)}`);