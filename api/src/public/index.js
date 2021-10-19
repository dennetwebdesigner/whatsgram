//Requisição Express
const express = require('express');
// requisições 
const app = express();

// criei um server
const server = require('http').createServer(app);

//rotas public -> front-end
app.use('/', express.static(require('path').resolve(__dirname, 'public')));

//Rota Principal
app.get('/api/', (req, res) => {
    res.render("../public/");
});


//Servidor principal
server.listen(3000, () => {
    console.log("Servidor Rodando na Porta 3000");
    console.log("Para encerrar 'CTRL + C'")
})