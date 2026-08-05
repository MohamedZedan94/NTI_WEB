const fs = require("fs")


function readGrades(){
    let data = fs.readFileSync("./data/grade.json","utf-8")
    return JSON.parse(data)
}

module.exports=readGrades