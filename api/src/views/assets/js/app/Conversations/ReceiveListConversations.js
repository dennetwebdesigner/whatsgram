import { QS } from '../../helpers/index.js'
import socket from '../../helpers/Websocket.js'
import ListConversations from "./ListConversations.js"

// recebe todas as conversa pre existentes
class ReceiveListConversations {

    constructor() {
        this.conversationsElement = QS('#conversations')
        this.init()
        this.data = null
    }

    async init() {
        socket.receive('usersList', data => {
            this.conversationsElement.innerHTML = ''
            ListConversations.init(data)
            this.data = data
        })
    }
}

export default new ReceiveListConversations()