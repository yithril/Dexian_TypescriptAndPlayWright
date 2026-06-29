// Day 1 TypeScript Lab - complete all four parts in this one file.

/**
 * Mountain interface.
 *
 * @interface Mountain
 */
interface Mountain {
  name: string;
  height: number;
}

/**
 * Array of mountains.
 *
 * @type {Mountain[]}
 */
const mountains: Mountain[] = [
  { name: 'Kilimanjaro', height: 19341 },
  { name: 'Everest', height: 29029 },
  { name: 'Denali', height: 20310 }
];

/**
 * Finds the name of the tallest mountain.
 *
 * @param {Mountain[]} mountains
 * @return {*}  {string}
 */
const findNameOfTallestMountain = (mountains: Mountain[]): string => {
  if (mountains.length === 0) {
    return 'NO MOUNTAINS PROVIDED.';
  }

  let tallestMountain = mountains[0];
  for (const mountain of mountains) {
    if (mountain.height > tallestMountain.height) {
      tallestMountain = mountain;
    }
  }
  return tallestMountain.name;
};

console.log('Tallest Mountain: ' + findNameOfTallestMountain(mountains));
