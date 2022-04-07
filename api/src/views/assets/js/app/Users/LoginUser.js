import socket from "../../helpers/Websocket.js"

class LoginUser {
    constructor() {
        this.addServer()
    }

    addServer() {
        // adiciona um novo usuario a lista do servidor
        socket.send('newUser', {
            user: window.localStorage.getItem('user'),
            token: window.localStorage.getItem('token')
        })
    }

}

export default new LoginUser()