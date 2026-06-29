import type { Product } from "./products";
interface InventoryItem {
    product: Product,
    quantity: number
}

let inventory: InventoryItem[] = [];
inventory.push({product : {name : "motor",price: 10.00},quantity: 10}, {product : {name : "sensor",price: 12.50},quantity: 4}, {product : {name : "LED",price: 1.00},quantity: 20});

const calcInventoryValue = (invObj: InventoryItem[]): number => {
    let sum = 0;
    invObj.forEach((inv) => {
        sum = sum + (inv.product.price * inv.quantity)
    })
    return sum;
}

const totalValue = calcInventoryValue(inventory);
console.log(`Total value of all the products in the inventory : ${totalValue}`)