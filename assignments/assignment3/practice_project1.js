const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes1.json");

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const method = req.method;

    // HOME ROUTE
    if (method === "GET" && pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Server responded");
    }


    else if (method === "GET" && pathname === "/notes") {

        const id = url.searchParams.get("id");

        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end("Cannot get data");
            }

            const notes = JSON.parse(data || "[]");

            if (id) {
                const note = notes.find((n) => n.id == id);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(note || {}));
            } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(notes));
            }
        });
    }

    
    else if (method === "POST" && pathname === "/notes") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            fs.readFile(filePath, "utf-8", (err, data) => {

                let notes = [];

                if (!err && data) {
                    notes = JSON.parse(data);
                }

                const parsedBody = JSON.parse(body);

                notes.push(parsedBody);

                fs.writeFile(filePath, JSON.stringify(notes), (err) => {
                    if (err) {
                        res.writeHead(500);
                        res.end("Error saving data");
                    } else {
                        res.writeHead(201, { "Content-Type": "text/plain" });
                        res.end("Done!");
                    }
                });
            });
        });
    }

    
    else {
        res.writeHead(404);
        res.end("Route not found");
    }

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
})