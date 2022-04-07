class Messages {
    constructor(io, baseUrl, USER_SERVER) {
        this.io = io
        this.baseUrl = baseUrl
        this.USER_SERVER = USER_SERVER

        this.axios = require('axios')

    }

    convertTimestamp(updatedAt) {
        const timestamp = new Date(updatedAt);

        const hours = timestamp.getHours()
        const minutes = timestamp.getMinutes()
        const second = timestamp.getSeconds()
        const day = timestamp.getDate()
        const month = timestamp.getMonth()
        const year = timestamp.getFullYear()

        return `${hours}:${minutes}:${second} ${day}/${month}/${year}`
    }

    async all(socket, data) {
        this.configAxios = {
            headers: { Authorization: `Bearer ${data.token}` }
        }

        const message_data = await this.axios.get(`${this.baseUrl}/api/messages/${data.room}`, this.configAxios)

        await message_data.data.sort((a, b) => {
            return a.id - b.id || a.name.localeCompare(b.name);
        });

        socket.emit('message_all', message_data.data)
    }

    async send(data, socket) {
        socket.emit('message_receive', data.message)
        socket.broadcast.to(parseInt(data.room)).emit('message_receive', data.message);
    }

    async receive(socket) {
        socket.on('message_send', async data => {
            const user = await this.USER_SERVER.find(element => element.id == data.user_id)

            this.configAxios = {
                headers: { Authorization: `Bearer ${data.token}` }
            }

            const last_message = await this.axios.post(`${this.baseUrl}/api/messages/${data.room}`, { message: data.message }, this.configAxios)

            last_message.data.updatedAt = this.convertTimestamp(last_message.data.updatedAt)

            this.send({ message: last_message.data, room: data.room }, socket)
        })
    }
}

module.exports = Messages