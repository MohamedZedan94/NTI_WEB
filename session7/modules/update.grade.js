const readGrades=require("./read.grade.js")
const saveGrades = require ("./save.grade.js") 

function updateGrades(id,newGrade){

    let grades = readGrades()

    grades.forEach((student)=>
    {   
     if(student.id===id)
        {
            student.grade=newGrade
        }
    })
    saveGrades(grades)
    console.log("updated successfully")
    
}
module.exports=updateGrades