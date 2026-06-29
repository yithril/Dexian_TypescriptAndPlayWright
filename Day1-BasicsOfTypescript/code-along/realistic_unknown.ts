let taskJson = '{"title": "Write tests", "estimatedHours": "three"}';
 
let calcEstimatedMinutes = (hours: number): number => hours * 60;
 
//JSON.parse returns any in TS
let loadedAny:any = JSON.parse(taskJson); 
 
console.log(calcEstimatedMinutes(loadedAny.estimatedHours));

let loadedUnknown: unknown = JSON.parse(taskJson);

//This won't compile
//console.log(calcEstimatedMinutes(loadedUnknown.estimatedHours));
 
let getEstimatedHours = (data: unknown): number => {
  if (
    typeof data === "object" &&
    data !== null &&
    "estimatedHours" in data &&
    typeof (data as { estimatedHours: unknown }).estimatedHours === "number"
  ) {
    return (data as { estimatedHours: number }).estimatedHours;
  }
  throw new Error("Invalid task data: estimatedHours is missing or not a number");
};
 
try {
  console.log(calcEstimatedMinutes(getEstimatedHours(loadedUnknown)));
} catch (err) {
  if (err instanceof Error) {
    console.log("Rejected bad data immediately:", err.message);
  }
}