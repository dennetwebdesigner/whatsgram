require('./database')

class App {
    constructor() {
        //Requisição 
        this.express = require('express');
        this.cors = require('cors')
        this.route = require('./routes/routes')
        this.socketio = require('socket.io')
        this.websocket = require('./websocket/index')

        this.routesView = require('./routes/public')

        //instanciando express
        this.app = this.express();

        this.SERVER_USERS = []



        // criei um server
        this.server = require('http').createServer(this.app)

        this.middleware()
        this.routes()
        this.realtime()
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

    realtime() {
        this.websocket(this.socketio, this.server)
    }
}

module.exports = new App().server