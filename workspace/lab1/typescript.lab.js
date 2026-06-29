"use strict";
let mountains = [
    { name: 'Kilimanjaro', height: 19341 },
    { name: 'Everest', height: 29029 },
    { name: 'Denali', height: 20310 }
];
const findNameOfTallestMountain = (mountains) => {
    let highestMoutain = '';
    let currentHeight = 0;
    for (let i = 0; i < mountains.length; i++) {
        if (mountains[i].height > currentHeight) {
            highestMoutain = mountains[i].name;
            currentHeight = mountains[i].height;
        }
    }
    return highestMoutain;
};
let highestMountain = findNameOfTallestMountain(mountains);
console.log('The highest moutains is ' + highestMountain + '.');
