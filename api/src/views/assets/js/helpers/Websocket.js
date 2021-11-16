import helpers from "./index.js"
class WebSocket {
    constructor() {
        this.url = helpers.baseUrl
        this.socket = io(this.url, { cors: { origin: '*' } })
    }

    send(sign, data) {
        this.socket.emit(sign, data)
    }

    receive(sign, callback) {
        this.socket.on(sign, data => {
            console.log(data)
            callback(data)
        })
    }

}

export default new WebSocket()