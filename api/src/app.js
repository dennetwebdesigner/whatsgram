class App {
    constructor() {
        //Requisição Express
        this.express = require('express');
        this.app = this.express();

        //cors permissões
        this.cors = require('cors')

        // criei um server
        this.server = require('http').createServer(this.app)

        this.middleware()
        this.routes()
    }

    middleware() {
        this.app.use(this.express.json())
        this.app.use(this.cors())
    }

    routes() {
        //rotas public -> front-end
        this.app.use('/', this.express.static(require('path').resolve(__dirname, 'public')));
    }
}

module.exports = new App().server