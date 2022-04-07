import helpers from "./index.js"
class WebSocket {
    constructor() {
        this.url = helpers.baseUrl
        this.socket = io(this.url, { cors: { origin: '*' } })
        console.log(this.url)
        console.log('')
    }

    send(sign, data) {
        this.socket.emit(sign, data)
    }

    receive(sign, callback) {
        this.socket.on(sign, data => {
            callback(data)
        })
    }

}

export default new WebSocket()