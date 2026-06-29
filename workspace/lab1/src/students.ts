interface Student {
    name: string,
    grade: number | "incomplete"
}

let students: Student[] = [];

students.push({name : "Amir",grade: 92}, {name : "Priya",grade: 78}, {name : "Jordan",grade: "incomplete"}, {name : "Sam",grade: "incomplete"});

const printStudentReport = (studentObj: Student[]): void => {
    studentObj.forEach((std) => {
        console.log(`${std.name}: ${std.grade}`);
    })
}
const tallestMountain = printStudentReport(students);


