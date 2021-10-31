const { fdatasync } = require('fs');

require('./database')

class App {
    constructor() {
        //Requisição 
        this.express = require('express');
        this.cors = require('cors')
        this.route = require('./routes/routes')
        this.socketio = require('socket.io')
        this.axios = require('axios')

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
        const io = this.socketio(this.server, { cors: { origin: '*' } })

        io.on('connection', socket => {

            socket.on('newUser', async data => {

                const user = await this.SERVER_USERS.find(element => element.id == data.user)
                if (!user) {

                    const configAxios = {
                        headers: { Authorization: `Bearer ${data.token}` }
                    };

                    const axiosRespose = await this.axios.get(`http://localhost:3000/api/users/${data.user}`, configAxios)

                    this.SERVER_USERS.push({...axiosRespose.data, socket_id: socket.id })

                } else {
                    this.SERVER_USERS.forEach(element => {
                        (data.user == element.id)
                        element.socket_id = socket.id
                    })
                }

                socket.emit('usersList', this.SERVER_USERS)
                socket.broadcast.emit('usersList', this.SERVER_USERS)

            })

            socket.on('disconnect', async() => {

                let user = null
                await this.SERVER_USERS.forEach((element, index) => user = element.socket_id == socket.id ? {...element, index } : null)
                if (user) {
                    this.SERVER_USERS.splice(this.SERVER_USERS.indexOf(user.index), 1);
                    socket.broadcast.emit('usersList', this.SERVER_USERS)

                }
            })


        })
    }
}

module.exports = new App().server