const express = require("express");

const app = express();

app.get("/sum", (req, res) => {
    const sum = parseInt(req.query.a)+ parseInt(req.query.b);
    res.send(sum.toLocaleString())
})

app.get("/sub", (req, res) => {
    const sub = parseInt(req.query.a)-parseInt(req.query.b);
    res.send(sub.toLocaleString())
})

app.get("/div", (req, res) => {
    const div = parseInt(req.query.a)/parseInt(req.query.b);
    res.send(div.toLocaleString())
})

app.get("/mul", (req, res) => {
    const mul = parseInt(req.query.a)*parseInt(req.query.b);
    res.send(mul.toLocaleString())
})



app.listen(3000, ()=> {
    console.log("server is running at port 3000");
})