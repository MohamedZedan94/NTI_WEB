import addStudent from "./modules/addStudent.js";
import listStudents from "./modules/listStudents.js";
import filterPassed from "./modules/filterPassed.js";

addStudent("Mohamed", [90, 85, 80]);
addStudent("Ahmed", [50, 55, 40]);
addStudent("Sara", [70, 75, 65]);
addStudent("Ali", [95, 90, 98]);

listStudents();

filterPassed();