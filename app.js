const express = require('express')
const mongoose = require('mongoose') // incluindo mongoose

require("./models/Artigo") // incluiindo arquivo
const Artigo = mongoose.model('artigo')

const app = express()

app.use(express.json()) // permissão de acesso para usar o JSON
// permissão para que linha 9 seja usada

mongoose.connect('mongodb://localhost/luisdb', { // realizando a conexão com o mongoose
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { // verificando se conexão funcionou
    console.log("conexão realizada com sucesso!");
}).catch((erro) => { // caso a conexão não seja realizada
    console.log("Erro de conexão: " + erro);
})

app.get("/", (req, res) => { // Array function
    // res.send("Iniciando API com nodeJS")
    return res.json({
        titulo: "Como criar uma API" // retornando um objeto de dados
    })
})

app.post("/artigo", (req,res) => { // criar rota em insomnia
    console.log(req.body)
    return res.json(req.body)
})

app.listen(8080, (req, res) => {
    console.log("Server is running port 8080")
})