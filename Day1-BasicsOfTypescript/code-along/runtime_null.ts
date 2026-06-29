interface Task {
  id: number;
  title: string;
}
 
const tasks: Task[] = [
  { id: 1, title: "Write tests" },
  { id: 2, title: "Review PR" },
];
 
const findTaskById = (id: number): Task => {
  return tasks.find((task) => task.id === id) as Task;
};
 
//Find an id that exists
const existingTask = findTaskById(1);
console.log("Found:", existingTask.title);
 
//This one we don't have
const missingTask = findTaskById(999);
 
try {
  console.log("Found:", missingTask.title);
} catch (err) {
  if (err instanceof Error) {
    console.log("Runtime crash! TypeScript never warned us:", err.message);
  }
}