const readGrades = require ("./modules/read.grade.js")
const addGrade = require("./modules/add.grade.js")
const deleteGrade = require ("./modules/delete.grade.js")
const updateGrades = require ("./modules/update.grade.js")

addGrade(12,"Abd ELhfeze","science",25)
console.log(addGrade)

updateGrades(1,32232)

readGrades()