const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
require("dotenv").config();

const express = require("express");
const storeRouters = require("./routers/store-routers");
const productRouters = require("./routers/product-routers");
const authRouters = require("./routers/auth-routes");
const dbConnect = require("./config/dp-connect");
const path = require("path");
const app = express();
dbConnect();

app.use(express.json());
app.use("/api/v1/stores", storeRouters);
app.use("/api/v1/products", productRouters);
app.use("/api/v1/auth", authRouters);
app.use("/api/v1/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});