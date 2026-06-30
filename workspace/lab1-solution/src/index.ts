// Day 1 TypeScript Lab - reference solution (all four parts in one file).
//
// Run it with:
//   npm start                 (or)   npx ts-node src/index.ts
//
// Every function is an arrow function, matching the style used throughout the
// Playwright portion of the workshop.

// ── Part 1: Tallest Mountain ──────────────────────────────────────────────
interface Mountain {
  name: string;
  height: number;
}

const mountains: Mountain[] = [
  { name: "Kilimanjaro", height: 19341 },
  { name: "Everest", height: 29029 },
  { name: "Denali", height: 20310 },
];

const findNameOfTallestMountain = (mountains: Mountain[]): string => {
  let tallest = mountains[0];
  for (const mountain of mountains) {
    if (mountain.height > tallest.height) {
      tallest = mountain;
    }
  }
  return tallest.name;
};

const tallestMountainName = findNameOfTallestMountain(mountains);
console.log(tallestMountainName); // Everest

// ── Part 2: Products ──────────────────────────────────────────────────────
interface Product {
  name: string;
  price: number;
}

const products: Product[] = [
  { name: "Notebook", price: 3.5 },
  { name: "Pen", price: 1.25 },
  { name: "Backpack", price: 25.0 },
];

const calcAverageProductPrice = (products: Product[]): number => {
  const total = products.reduce((sum, product) => sum + product.price, 0);
  return total / products.length;
};

const averageProductPrice = calcAverageProductPrice(products);
console.log(averageProductPrice);

// ── Part 3: Inventory ─────────────────────────────────────────────────────
interface InventoryItem {
  product: Product;
  quantity: number;
}

const inventory: InventoryItem[] = [
  { product: { name: "motor", price: 10.0 }, quantity: 10 },
  { product: { name: "sensor", price: 12.5 }, quantity: 4 },
  { product: { name: "LED", price: 1.0 }, quantity: 20 },
];

const calcInventoryValue = (inventory: InventoryItem[]): number => {
  return inventory.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

const inventoryValue = calcInventoryValue(inventory);
console.log(inventoryValue); // 170

// ── Part 4: Student Grades ────────────────────────────────────────────────
interface Student {
  name: string;
  grade: number | "incomplete";
}

const students: Student[] = [
  { name: "Amir", grade: 92 },
  { name: "Priya", grade: 78 },
  { name: "Jordan", grade: "incomplete" },
  { name: "Sam", grade: "incomplete" },
];

const printStudentReport = (students: Student[]): void => {
  students.forEach((student) => {
    if (typeof student.grade === "number") {
      console.log(`${student.name}: ${student.grade}`);
    } else {
      // Here TypeScript has narrowed grade to the literal "incomplete".
      console.log(`${student.name}: ${student.grade}`);
    }
  });
};

printStudentReport(students);
