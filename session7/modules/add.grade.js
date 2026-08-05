const saveGrades = require ("./save.grade.js") 
const readGrades=require("./read.grade.js")

function addGrade(id,name,subject,grade){

    let grades = readGrades()

    grades.push({
        id,
        name,
        subject,
        grade
    })
saveGrades(grades)
console.log("student added");

}
module.exports=addGrade