require('./database')

class App {
    constructor() {
        //Requisição 
        this.express = require('express');
        this.cors = require('cors')
        this.route = require('./routes/routes')

        this.routesView = require('./routes/public')

        //instanciando express
        this.app = this.express();

        //cors permissões

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
        this.app.use('/api', this.route);
        //rotas public -> front-end
        this.app.use(this.routesView);

    }
}

module.exports = new App().server