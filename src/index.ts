import express from "express";

const app = express();

app.listen(3000,() => {
    console.log("Servidor online na porta 3000");
});

app.get("/",(req,res) => {
    res.send("Mundao e loko ")
});