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
interface Mountain{
    name: string;
    height: number;
}

let mountains: Mountain[] = [
    { name: "Kilimanjaro", height: 19341 },
    { name: "Everest", height: 29029 },
    { name: "Denali", height: 20310 }
];

const findNameOfTallestMountain = (mountains: Mountain[]) : string =>{
    let tallestMountain: Mountain = mountains[0]!;
    for (let mountain of mountains) {
        if (mountain.height > tallestMountain.height) {
            tallestMountain = mountain;
        }
    }
    return tallestMountain.name;
}

console.log(`Tallest Mountain: ${findNameOfTallestMountain(mountains)}`);

// ── Part 2: Products ──────────────────────────────────────────────────────
//   - interface Product { name: string; price: number }
//   - products: Product[]  (a few of your own)
//   - calcAverageProductPrice(products: Product[]): number
//   - Call it, store the result, console.log it.
interface Product {name: string; price: number}

let products: Product[] = [
    { name: "Apple", price: 1.25},
    { name: "Banana", price: 0.75},
    { name: "Orange", price: 2.00},
    { name: "Grapes", price: 3.50}
];

const calcAverageProductPrice = (products: Product[]): number => {
    let totalPrice: number = 0;
    for (let product of products) {
        totalPrice += product.price;
    }
    return totalPrice / products.length;
}

console.log(`Average Product Price: $${calcAverageProductPrice(products)}`);
    

// ── Part 3: Inventory ─────────────────────────────────────────────────────
//   - interface InventoryItem { product: Product; quantity: number }
//   - inventory: InventoryItem[]  (motor 10.00 x10, sensor 12.50 x4, LED 1.00 x20)
//   - calcInventoryValue(inventory: InventoryItem[]): number  (sum of price*qty)
//   - Call it, store the result, console.log it. 
interface InventoryItem { product: Product; quantity: number }

let inventory: InventoryItem[] = [
    { product: { name: "Motor", price: 10.00 }, quantity: 10 },
    { product: { name: "Sensor", price: 12.50 }, quantity: 4 },
    { product: {name: "LED", price: 1.00}, quantity: 20}
]

const calcInventoryValue = (inventory: InventoryItem[]): number => {
    let totalValue: number = 0;
    for (let item of inventory) {
        totalValue += item.product.price * item.quantity;
    }
    return totalValue;
}

console.log(`Total Inventory Value: $${calcInventoryValue(inventory)}`);

// ── Part 4: Student Grades ────────────────────────────────────────────────
//   - interface Student { name: string; grade: number | "incomplete" }
//   - students: Student[]  (Amir 92, Priya 78, Jordan "incomplete", Sam "incomplete")
//   - printStudentReport(students: Student[]): void
//   - Call it.
interface Student { name: string; grade: number | "incomplete" }

let students: Student[] = [
    { name: "Amir", grade: 92 },
    { name: "Priya", grade: 78 },
    { name: "Jordan", grade: "incomplete" },
    { name: "Sam", grade: "incomplete" }
];

const printStudentReport = (students: Student[]): void => {
    for (let student of students) {
        if (student.grade === "incomplete") {
            console.log(`${student.name}: Incomplete`);
        } else {
            console.log(`${student.name}: ${student.grade}`);
        }
    }
}

printStudentReport(students);   