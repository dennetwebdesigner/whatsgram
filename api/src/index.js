const app = require('./app')

//Servidor principal
app.listen(3000, () => {
    console.log("Servidor Rodando na Porta 3000");
    console.log("Para encerrar 'CTRL + C'")
})