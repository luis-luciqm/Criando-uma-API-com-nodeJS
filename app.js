const express = require("express")
const app = express()

app.get("/", (req, res) => { // Array function
    // res.send("Iniciando API com nodeJS")
    return res.json({
        titulo: "Como criar uma API" // retornando um objeto de dados
    })
})

app.listen(8080, (req, res) => {
    console.log("Server is running port 8080")
})