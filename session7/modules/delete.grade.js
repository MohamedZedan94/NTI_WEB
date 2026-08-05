const saveGrades =require("./save.grade.js") 
const readGrades =require("./read.grade.js")

function deleteGrade(id)
{

    let grades = readGrades() 
     grades = grades.filter((stud)=> stud.id != id) // true -> save | false -> delete

     saveGrades(grades)
     console.log("student deleted successfully")
}

module.exports=deleteGrade