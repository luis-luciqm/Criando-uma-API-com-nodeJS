const express = require("express")
const app = express()

app.get("/", (req, res) => { // Array function
    res.send("Iniciando API com nodeJS")
})

app.listen(8080, (req, res) => {
    console.log("Server is running port 8080")
})