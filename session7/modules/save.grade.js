const fs = require("fs")
const { json } = require("stream/consumers")

function saveGrades(data){

    
    fs.writeFileSync("./data/grade.json",JSON.stringify(data,null,2))

}
module.exports=saveGrades