import socket from "../../helpers/Websocket.js";

class SendMessage {

    async start(message) {

        this.user = window.localStorage.getItem('user')
        this.token = window.localStorage.getItem('token')
        this.room = window.localStorage.getItem('by')

        socket.send('message_send', {
            message,
            user_id: this.user,
            token: this.token,
            room: this.room
        })
    }
}

export default new SendMessage()