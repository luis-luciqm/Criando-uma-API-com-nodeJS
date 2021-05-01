const express = require('express')
const mongoose = require('mongoose') // incluindo mongoose

require("./models/Artigo") // incluiindo arquivo
const Artigo = mongoose.model('artigo') // const Artigo recebe o models Artigos

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

    // Listar na API
    // Artigo.find({}) === procurar todos os arquivos
    Artigo.find({}).then((artigo) =>{ // caso consiga retornar com sucesso os artigos
        return res.json(artigo) // retornando os artigos
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!\n Codigo do erro: " + erro
        })
    })
})

app.post("/artigo", (req,res) => { // criar rota em insomnia
    // console.log(req.body)
    // return res.json(req.body)
    const artigo = Artigo.create(req.body, (err) => { // salvando no banco de dados
        if(err) return res.status(400).json({ // retornando erro 404
            error: true,
            message: "Erro: O artigo não foi cadastrado"
        })
        // se não houver nenhum erro
        return res.status(200).json({
            error: false,
            message: "O artigo foi cadastrado com sucesso"
        }) 
    }) 
})

app.listen(8080, (req, res) => {
    console.log("Server is running port 8080")
})