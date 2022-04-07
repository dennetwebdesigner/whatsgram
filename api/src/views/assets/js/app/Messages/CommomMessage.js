import { QS } from "../../helpers/index.js"
import socket from "../../helpers/Websocket.js"
import SendMessage from "./SendMessage.js"
import ReceivedMessage from "./ReceivedMessage.js"
import NewMessage from "./NewMessage.js"

class CommomMessage {

    constructor() {
        // formulario html para envio de novas mensagens 
        this.sendMessageElement = QS('#send-message')
        // Fecha janela de chat privado
        this.chatBackSwitch = QS('#chat-back')
        // janela de bate papo privado
        this.chatContainer = QS('#chat-content')
        // elemento html para recebimento de mensagens
        this.listMessageElement = QS('#chat-messages');

        this.handleClickButtonSendMessage()
        this.insertInHTML()
        this.closedWindow()
    }

    // adiciona ao html todas as mensagens
    async insertInHTML() {
        socket.receive('message_all', data => {
            this.listMessageElement.innerHTML = ''
            data.forEach(element => {
                NewMessage.insert(element)
            })
        })
    }

    // capturar mensagem digitada pelo usuario
    handleClickButtonSendMessage() {
        this.sendMessageElement.addEventListener('submit', async e => {

            e.preventDefault()
            const message = e.target.elements.message

            if (!message.value) {
                message.placeholder = 'por favor digite uma mensagem antes de enviar'
                return
            }

            SendMessage.start(message.value)

            message.value = ''
        })

        ReceivedMessage.init()

    }

    // animação de janela de batepapo privado fechar
    closedWindow() {
        this.chatBackSwitch.addEventListener('click', () => {
            this.chatContainer.style.transform = 'translateX(-100%)'
            window.localStorage.removeItem('by')
        })
    }
}


export default new CommomMessage()