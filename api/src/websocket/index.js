const axios = require('axios')
const protocol = 'http://'
const host = 'localhost'
const port = ':3000'
const baseUrl = `${protocol}${host}${port}`
const SERVER_USERS = []
const SERVER_MESSAGES = []
const Messages = require('./Messages')
let messages = null

const websocket = (socketio, server) => {
    const io = socketio(server, { cors: { origin: '*' } })
    messages = new Messages(io, baseUrl, SERVER_USERS)
    io.on('connection', socket => {

        // quando um novo usario entrar no chat
        connection(socket)

        // recebendo uma messagem do front 
        messages.receive(socket)

        socket.on('select_messages', data => {
            messages.all(socket, data)
        })

        // quando um novo usario sair do chat
        disconnect(socket)

    })
}

const connection = (socket) => {

    socket.on('newUser', async data => {
        const user = await SERVER_USERS.find(element => element.id == data.user)
        if (!user) {

            const configAxios = {
                headers: { Authorization: `Bearer ${data.token}` }
            };

            const axiosRespose = await axios.get(`${baseUrl}/api/users/${data.user}`, configAxios)

            SERVER_USERS.push({ ...axiosRespose.data, socket_id: socket.id })



        } else {
            SERVER_USERS.forEach(element => {
                (data.user == element.id)
                element.socket_id = socket.id
            })
        }

        socket.emit('usersList', SERVER_USERS)
        socket.broadcast.emit('usersList', SERVER_USERS)
        socket.join(parseInt(data.user))

    })





}



const disconnect = socket => {
    socket.on('disconnect', async () => {
        let user = null
        await SERVER_USERS.forEach((element, index) => user = element.socket_id == socket.id ? { ...element, index } : null)
        if (user) {
            SERVER_USERS.splice(SERVER_USERS.indexOf(user.index), 1);
            socket.broadcast.emit('usersList', SERVER_USERS)
        }
    })
}

const message_send = {

}

module.exports = websocket