// Day 1 TypeScript Lab - complete all four parts in this one file.

/**
 * Student interface.
 *
 * @interface Student
 */
interface Student {
  name: string;
  grade: number | 'incomplete';
}

/**
 * Array of students.
 *
 * @type {Student[]}
 */
const students: Student[] = [
  { name: 'Amir', grade: 92 },
  { name: 'Priya', grade: 78 },
  { name: 'Jordan', grade: 'incomplete' },
  { name: 'Sam', grade: 'incomplete' }
];

/**
 * Prints a report of students and their grades.
 *
 * @param {Student[]} students
 */
const printStudentReport = (students: Student[]): void => {
  students.forEach((student) => {
    console.log(`${student.name}: ${student.grade}`);
  });
};

printStudentReport(students);
