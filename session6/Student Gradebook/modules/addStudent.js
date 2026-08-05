import students from "../data/students.js";

function addStudent(name, grades) {

    students.push({
        name,
        grades
    });

    console.log(name + " added.");

}

export default addStudent;