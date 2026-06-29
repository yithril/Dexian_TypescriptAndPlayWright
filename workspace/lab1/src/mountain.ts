export interface Mountain {
    name: string,
    height: number
}

let mountains: Mountain[] = [];

mountains.push({name : "Kilimanjaro",height: 19341}, {name : "Everest",height: 29029}, {name : "Denali",height: 20310});

const findNameOfTallestMountain = (mountainObj: Mountain[]): string => {
    if ( Array.isArray(mountainObj) && mountainObj.length > 0) {
        const sorted = mountains.sort((a, b) => b.height - a.height)[0];
        return sorted.name;
    } else {
        return "No Mountain Found"
    }
}

const tallestMountain = findNameOfTallestMountain(mountains);

console.log(`Tallest Mountain is : ${tallestMountain}`);
