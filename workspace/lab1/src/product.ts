// Day 1 TypeScript Lab - complete all four parts in this one file.

/**
 * Product interface.
 *
 * @export
 * @interface Product
 */
export interface Product {
  name: string;
  price: number;
}

/**
 * Array of products.
 *
 * @type {Product[]}
 */
const products: Product[] = [
  { name: 'Bears Football', price: 55.0 },
  { name: 'Bears Jersey', price: 150.5 },
  { name: 'Bears Cap', price: 35.75 }
];

/**
 * Calculates the average price of the products.
 *
 * @param {Product[]} products
 * @return {*}  {number}
 */
const calcAverageProductPrice = (products: Product[]): number => {
  if (products.length === 0) {
    return 0;
  }
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return total / products.length;
};

console.log(`Average product price: $${calcAverageProductPrice(products).toFixed(2)}`);
