const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    
    const time = new Date().toLocaleString();

    
    const log = `${time} - ${req.url}\n`;

   
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.log("Error writing log");
        }
    });

    res.end("Request received");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});