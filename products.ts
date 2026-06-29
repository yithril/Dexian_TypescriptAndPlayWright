//Declare an interface called Product that contains following properties
interface Product {
    name: string;
    price: number;
}

//Declare an array called products which is an array of type Product.
let products : Product[] = [
//Fill the array witha few products of your own choosing
    {name:"Apple", price: 10.00},
    {name:"Beans", price: 2.00},
    {name:"Bannana", price: 3.50},
    {name:"Orange", price:6.29},
    {name:"Peach", price:2.45}
]

//Declare a funtion called calcAverageProductPrice. Return the average of all price.
const calcAverageProductPrice = (products: Product []): number => {

    let total = 0; //initializing total to zero.
    
    for (const product of products){
        total = total + product.price //adding each price to total
    }

    let average = total / products.length; //divide by the number of products

    return average;
}

const result = calcAverageProductPrice(products);
console.log(`Average price of all procuce is ${result.toFixed(2)}`);