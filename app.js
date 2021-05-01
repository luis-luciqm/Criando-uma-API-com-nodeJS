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
        return res.status(400).json({ // se caso não encontre nenhum artigo, ou encontre algum erro
            error: true,
            message: "Nenhum artigo encontrado!\n Codigo do erro: " + erro
        })
    })
})

// visualizar artigo de acordo com o id passado pelo parametro
app.get("/artigo/:id", (req,res) => {
    // console.log(req.params.id)
    Artigo.findOne({_id: req.params.id}).then((artigo) => { // pego a const artigo, busco um artigo com FindOne.
                                                            // ({condição: quando a posição id == req.params.id})
        return res.json(artigo) //  com o then() retorno o artigo encontrado
    }).catch((erro) => { // se não econtrar
        return res.status(400).json({ // retorno o status de erro 400
            error: true,
            message: "Nenhum artigo foi encontrado"
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

// editando dados com PUT
app.put("/artigo/:id", (req, res) => {
    // artigo pega a models artigo e realiza o update, indica que quer editar quando o id === id do parametro
    // req.params.id é o id que veio pelo parametro
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (err) => { // caso tenha um erro
        if(err) return res.status(400).json({
            error: true,
            message: "Artigo não foi editado"
        })
        // se não houver nenhum erro
        return res.json({
            error: false,
            message: "Artigo editado com sucesso"
        })
        // não precisa especificar o status(200), se funcionar o status é 200
    })

})

app.delete("/artigo/:id", (req,res) => { // rota do tipo delete em insomnia
    // irá deletar apenas um 
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Não foi possível excluir artigo"
        })
        return res.json({
            error: false,
            message: "Artigo foi editado com sucesso"
        })
    })
})

app.listen(8080, (req, res) => {
    console.log("Server is running port 8080")
})