const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();


const express = require("express");
const courseRouters = require("./routers/course-routers");
const dbConnect = require("./config/dp-connect");
const app = express();
app.use(express.json());
dbConnect();

app.use("/api/v1/courses", courseRouters);


app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});