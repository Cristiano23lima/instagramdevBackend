const express = require('express');
const app = express();// Cria um servidor
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');//permite acesso ao backend por qualquer aplicação

const server = require('http').Server(app);//protocolos http
const io = require('socket.io')(server);//faz com quer o server aceite conexões http e websockets

mongoose.connect('mongodb+srv://instaOmniStack:cristiano_23lima@cluster0-irgqf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,//informa que estou utilizando formato diferente para conecção
});


app.use((req, res, next) => {//criei um midleware para ter acesso a todas as rotas depois dessa função
    req.io = io;

    next();//permite que essa função seja executada sem atrapalhar as outras
})
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));//para acessar as imagens
app.use(require('./router'));//pega as minhas rotas no arquivo router.js

server.listen(process.env.PORT || 3333);
