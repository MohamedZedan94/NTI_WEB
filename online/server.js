const fs = require("fs");
const path = require("path");
const http = require("http");

const filePath = path.join(__dirname, "products.json");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    res.setHeader("Content-Type", "application/json");

    // GET ALL PRODUCTS
    if (method === "GET" && url === "/products") {

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify({ message: "Error reading file" }));
            }

            res.writeHead(200);
            res.end(data);
        });

    }

    // ADD PRODUCT
    else if (method === "POST" && url === "/products") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const product = JSON.parse(body);

                fs.readFile(filePath, "utf8", (err, data) => {

                    if (err) {
                        res.writeHead(500);
                        return res.end(JSON.stringify({ message: "Error reading file" }));
                    }

                    const products = JSON.parse(data);

                    products.push(product);

                    fs.writeFile(
                        filePath,
                        JSON.stringify(products, null, 2),
                        (err) => {

                            if (err) {
                                res.writeHead(500);
                                return res.end(JSON.stringify({ message: "Error saving file" }));
                            }

                            res.writeHead(201);
                            res.end(JSON.stringify({
                                message: "Product added successfully",
                                product
                            }));

                        }
                    );

                });

            } catch (err) {

                res.writeHead(400);
                return res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));

            }

        });

    }

    // ROUTE NOT FOUND
    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            message: "Route Not Found"
        }));
    }

});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});