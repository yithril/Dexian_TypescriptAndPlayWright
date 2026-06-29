export interface Product {
    name: string,
    price: number
}

let products: Product[] = [];
products.push({name : "tapes",price: 24}, {name : "Box",price: 1.10}, {name : "Magic Bullet",price: 50});

const calcAverageProductPrice = (productObj: Product[]): number => {
    let sum = 0;
    productObj.forEach((prod) => {
        sum = sum + prod.price;
    })
    console.log(`Total Price : ${sum}`)
    return Number((sum/productObj.length).toFixed(2));
}

const avgProdPrice = calcAverageProductPrice(products);
console.log(`Average product price : ${avgProdPrice}`)