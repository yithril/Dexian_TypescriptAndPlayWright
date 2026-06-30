// Day 1 TypeScript Lab - complete all four parts in this one file.
//
// Run it any time with:
//   npm start                 (or)   npx ts-node src/index.ts
//
// Write every function as an arrow function, e.g.:
//   const myFunction = (param: string): void => { ... };

// ── Part 1: Tallest Mountain ──────────────────────────────────────────────
//   - interface Mountain { name: string; height: number }
//   - mountains: Mountain[]  (Kilimanjaro 19341, Everest 29029, Denali 20310)
//   - findNameOfTallestMountain(mountains: Mountain[]): string
//   - Call it, store the result, console.log it.

// ── Part 2: Products ──────────────────────────────────────────────────────
//   - interface Product { name: string; price: number }
//   - products: Product[]  (a few of your own)
//   - calcAverageProductPrice(products: Product[]): number
//   - Call it, store the result, console.log it.

// ── Part 3: Inventory ─────────────────────────────────────────────────────
//   - interface InventoryItem { product: Product; quantity: number }
//   - inventory: InventoryItem[]  (motor 10.00 x10, sensor 12.50 x4, LED 1.00 x20)
//   - calcInventoryValue(inventory: InventoryItem[]): number  (sum of price*qty)
//   - Call it, store the result, console.log it.

// ── Part 4: Student Grades ────────────────────────────────────────────────
//   - interface Student { name: string; grade: number | "incomplete" }
//   - students: Student[]  (Amir 92, Priya 78, Jordan "incomplete", Sam "incomplete")
//   - printStudentReport(students: Student[]): void
//   - Call it.

/**
 *  Defining all the type interfaces
 *  1. Mountain
 *  2. Product
 *  3. InventoryItem
 *  4. Student
 *
 */

interface Mountain {
  name: string;
  height: number;
}

interface Product {
  name: string;
  price: number;
}

interface InventoryItem {
  product: Product;
  quantity: number;
}

interface Student {
  name: string;
  grade: number | 'incomplete';
}

/**
 * Declaring and initializing arrays
 * 1. mountains
 * 2. products
 * 3. inventory
 * 4. student
 */
const mountains: Mountain[] = [
  { name: 'Kilmanjaro', height: 19341 },
  { name: 'Everest', height: 29029 },
  { name: 'Denali', height: 20310 }
];

const product: Product[] = [
  { name: 'Pallet Truck', price: 300 },
  { name: 'Office Chair', price: 40 },
  { name: 'Tape', price: 3 },
  { name: 'Jar', price: 2.5 },
  { name: 'Notepad', price: 4 },
  { name: 'Keyboard', price: 33 }
];

const inventory: InventoryItem[] = [
  { product: { name: 'motor', price: 10.0 }, quantity: 10 },
  { product: { name: 'sensor', price: 12.5 }, quantity: 4 },
  { product: { name: 'LED', price: 1.0 }, quantity: 20 }
];

const student: Student[] = [
  { name: 'Amir', grade: 92 },
  { name: 'Priya', grade: 78 },
  { name: 'Jordan', grade: 'incomplete' },
  { name: 'Sam', grade: 'incomplete' }
];

//functions
/**
 *  It takes one parameter, an array of Mountain objects. It returns a string,
 *  the name of the tallest mountain in the given array.
 * @param names
 * @returns : Highest value of height
 */
const findNameOfTallestMountain = (names: Mountain[]): string => {
  if (names.length === 0) {
    return '';
  }
  const sortedArr = names.sort((firstName, secondName) => secondName.height - firstName.height);
  return sortedArr[0].name;
};

/**
 * It takes one parameter, an array of Product objects. It returns a number,
 * the average price of all the products provided as an argument.
 * @param productPrices
 * @returns avarage price of total bucket
 */
const calcAverageProductPrice = (productPrices: Product[]): number => {
  if (productPrices.length === 0) {
    return 0;
  }
  let sumOfPrices = 0;
  for (let i = 0; i < productPrices.length; i++) {
    sumOfPrices += productPrices[i].price;
  }
  return sumOfPrices / productPrices.length;
};

/**
 * It takes one parameter, an array of InventoryItem objects.
 * It returns a number, the total value of all the
 * products in the inventory array provided as an argument.
 * @param itemlists
 * @returns total price of the inventory
 */
const calcInventoryValue = (itemlists: InventoryItem[]): number => {
  if (itemlists.length === 0) {
    return 0;
  }

  let priceOfEachProductInventory = 0;

  for (let i = 0; i < itemlists.length; i++) {
    priceOfEachProductInventory += itemlists[i].product.price * itemlists[i].quantity;
  }
  return priceOfEachProductInventory;
};

/**
 *  It takes one parameter, an array of Student objects. It does not return a value
 * @param Array of Student Type
 * @returns void
 */

const printStudentReport = (std: Student[]): void => {
  if (std.length === 0) {
    console.log("Student array doesn't have any data");
  } else {
    for (let i = 0; i < std.length; i++) {
      console.log(`"${std[i].name} : ${std[i].grade}"`);
    }
  }
};

export function getInfo() {
  console.log(' Tallest Mountain : ' + findNameOfTallestMountain(mountains));
  console.log(' Average Product Price : ' + calcAverageProductPrice(product));
  console.log(' Total Inventory Price ' + calcInventoryValue(inventory));
  console.log(' Student Reports-');
  printStudentReport(student);
}

getInfo();
