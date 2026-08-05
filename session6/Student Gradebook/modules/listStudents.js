import students from "../data/students.js";
import calculateAverage from "./calculateAverage.js";

function listStudents() {

    console.log("Students:");

    students.forEach(student => {

        const average = calculateAverage(student.grades);

        console.log(student.name);
        console.log("Grades:", student.grades);
        console.log("Average:", average);
        console.log("----------------");
    });

}

export default listStudents;