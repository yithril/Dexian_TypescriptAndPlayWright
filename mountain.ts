//Day 1 Lab

//Declare an interface called Mountain that contains two properties
interface Mountain {
    name: string;
    height: number;
}

//Declare an array called mountains which is an array of type Mountain.
let mountains : Mountain[] = [
    {name:"Kilimanjaro", height:19341 },
    {name:"Everest", height:29029},
    {name:"Denali", height:20310}
];

//Declare a funtion called findNameOfTallestMountain. it takes one parameter, an array of mountain
//object. It returns a string, the name of the tallest mountain in the given array.
const findNameOftallestMountain = (mountains: Mountain[]): string => {

    let tallest = mountains[0]!;

    for (const mountain of mountains) {
        if (mountain.height > tallest.height) {
            tallest = mountain;
        }
    }
       
    return `Tallest mountain is ${tallest.name}`;
}

//Call findNameOfTallestMountain, passing it your mountains array as an argument.
//store the result of the funtion call (the return value) in a variable and then console.log the variable. 

const result = findNameOftallestMountain(mountains);
console.log(result);




