// Tallest Mountain
interface Mountain {
    name: string;
    height: number;
}

let mountains:Mountain[] = [
    { name: 'Kilimanjaro', height: 19341 },
    { name: 'Everest', height: 29029 },
    { name: 'Denali', height: 20310 }
]

const findNameOfTallestMountain = (mountains:Mountain[]) : string => {
    let highestMountain = '';
    let currentHeight = 0;
    mountains.forEach(mountain => {
        if (mountain.height > currentHeight) {
            highestMountain = mountain.name;
            currentHeight = mountain.height;
        }
    });
    return highestMountain;
}

let highestMountain = findNameOfTallestMountain(mountains);
console.log('The highest mountain is ' + highestMountain + '.');

// Products
interface Product {
    name: string;
    price: number;
}

// Pinball Machines
let products:Product[] = [
    { name: 'Star Wars', price: 9998 },
    { name: 'Jaws', price: 8889 },
    { name: 'Iron Maiden', price: 9000 },
    { name: 'Dungeons & Dragons', price: 10199 }
]

const calcAverageProductPrice = (products:Product[]) : number => {
    let averageProductPrice = 0;
    products.forEach(product => {
        averageProductPrice += product.price;
    });
    averageProductPrice = averageProductPrice / products.length;
    return averageProductPrice; 
}

const formatCurrency = (price: number): string => {
    let formattedPrice = new Intl.NumberFormat(
        'en-US', 
        { style: 'currency', currency: 'USD' }
    ).format(price);
    return formattedPrice;
}

let averagePrice = calcAverageProductPrice(products);
console.log('The average price of a pinball machine is ' + formatCurrency(averagePrice) + '.');

// Inventory
interface InventoryItem {
    product: Product;
    quantity: number;
}

let inventory: InventoryItem[] = [
    { product: { name: 'motor', price: 10.00 }, quantity: 10 },
    { product: { name: 'sensor', price: 12.50 }, quantity: 4 },
    { product: { name: 'LED', price: 1.00 }, quantity: 20 }
]

const calcInventoryValue = (inventory:InventoryItem[]) : number => {
    let totalValue = 0;
    inventory.forEach(item => {
        totalValue += item.product.price * item.quantity;
    });
    return totalValue; 
}

let totalInventoryValue = calcInventoryValue(inventory);
console.log('The total value of my inventory is ' + formatCurrency(totalInventoryValue) + '.');

// Student Grades
interface Student {
    name: string;
    grade: number | 'incomplete';
}

let students: Student[] = [
    { name: 'Amir', grade: 92 },
    { name: 'Priya', grade: 78 },
    { name: 'Jordan', grade: 'incomplete' },
    { name: 'Sam', grade: 'incomplete' }
]

const printStudentReport = (students:Student[]) : void => {
    students.forEach(student => {
        console.log(student.name + ': ' + student.grade);
    });
}

printStudentReport(students);