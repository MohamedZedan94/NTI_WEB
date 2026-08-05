const fs =require("fs");
const express = require("express");

let courses= JSON.parse(fs.readFileSync("./data/courses data.json"));

const app = express();
app.get("/api/v1/courses")
app.listen(5000,()=>{
    console.log("server running on port 5000")
});