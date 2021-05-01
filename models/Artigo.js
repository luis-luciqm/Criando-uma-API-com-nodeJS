const mongoose = require('mongoose') // definindo models
// consultar site mongoose docs: npmjs/package
// mongoosejs.com/docs
const Artigo = new mongoose.Schema({ // definindo models
     titulo: {
        type: String,
        required: true
     },
     conteudo: {
        type: String,
        required: true
     }
},
{
    timestamps: true // criando automaticamente o create at e update at
})

mongoose.model('artigo', Artigo)