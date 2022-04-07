const axios = require('axios')

// NGROK
// const protocol = 'https://'
// const host = 'cef0-2804-26d8-d01-2e5-b42c-be3b-6787-1462.ngrok.io'
// const port = ''


// TEST
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


        // listar contatos
        socket.on('contact-list', async data => {

            const configAxios = {
                headers: { Authorization: `Bearer ${data.token}` }
            };

            const contacts = await axios.get(`${baseUrl}/api/contacts`, configAxios)

            socket.emit('contact-list-response', contacts.data)

        })

        socket.on('contact-add', async data => {
            const configAxios = {
                headers: { Authorization: `Bearer ${data.token}` }
            };


            const user_add = await axios.post(`${baseUrl}/api/contacts`, { email: data.email }, configAxios)

            if (user_add.data.error)
                socket.emit('contact-add-response', { error: user_add.data.error })
            else
                socket.emit('contact-add-response', { success: true })
        })



        // quando um novo usario sair do chat
        disconnect(socket)

    })
}

let dataContacts = null

const connection = (socket) => {

    socket.on('newUser', async data => {
        const configAxios = {
            headers: { Authorization: `Bearer ${data.token}` }
        };

        const last_users = await axios.get(`${baseUrl}/api/messages`, configAxios)

        let last_users_response = []

        await last_users.data.forEach(element => {
            last_users_response.push({
                id: element.id,
                name: element.name,
                img: element.img,
            })
        })

        const user = await SERVER_USERS.find(element => element.id == data.user)

        if (!user) {

            const axiosRespose = await axios.get(`${baseUrl}/api/users/${data.user}`, configAxios)

            SERVER_USERS.push({ ...axiosRespose.data, socket_id: socket.id })

        } else {
            SERVER_USERS.forEach(element => {
                (data.user == element.id)
                element.socket_id = socket.id
            })
        }

        socket.emit('usersList', last_users_response)
        // socket.broadcast.emit('usersList', SERVER_USERS)
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