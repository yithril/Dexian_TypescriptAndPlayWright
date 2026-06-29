//String boolean null undefined number symbol bigint 

import type { Mountain } from "./mountain";

//Declare some variables

let myName:string = "Jonathan Hop";
let age:number = 40;
let isComplete:boolean = true;

//This does not compile
//myName = 50;

//TS infers what data it's working with
let numberOfParticipants = 100;

//arrays?
let participants:string[] = ["Bob", "Alice", "John"];

//All elements in the array must be of the declared type
//participants.push(100);

//functions

//function declarations
function greetDeclaration(name:string) : string {
    return `Hello, ${name}!`;
}

//This line won't compile
//let greeting:number = greetDeclaration("Jonathan Hop");

//Arrow Functions
let greetArrow = (name:string) : string => {
    return `Hello, ${name}!`;
}

let greetArrowShort = (name:string) : string => `Hello, ${name}!`;

//Unions

//the variable userId could be a string or a number
let userId:string | number = "abc123";
userId = 123;

//you can do two or more or however you want
let example:string|number|boolean|null = 10;

//What happens if we have no idea what to expect?
let thisIsAnything:any = "Whatever you want";

interface Task {
    title: string;
    estimatedHours:number;
    priority: "low" | "medium" | "high";
}

let sampleTask:Task = {
    title: "Learn TypeScript",
    estimatedHours: 10,
    priority: "high"
}

enum JobType {
    Remote,
    OnSite
}

interface Job {
    title: string;
    location: JobType;
}

let newJob:Job = {
    title: "Software Engineer",
    location: JobType.Remote
}

let mountain:Mountain = {
    name: "Mount Everest"
}