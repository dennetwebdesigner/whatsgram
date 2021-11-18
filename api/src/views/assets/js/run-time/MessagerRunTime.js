import Helpers, { QS } from '../helpers/index.js'
import socket from '../helpers/Websocket.js'




class Message {

    constructor() {

        // elemento html para recebimento de mensagens
        this.listMessageElement = QS('#chat-messages');
        // formulario html para envio de novas mensagens 
        this.sendMessageElement = QS('#send-message')

        this.chatBackSwitch = document.querySelector('#chat-back')
        this.chatContainer = document.querySelector('#chat-content')


        this.list()
        this.sendEvent()
        this.closed()

    }

    add(element) {

        let user = null
        let myMessage = null

        // verifia de quem é a mensagem 
        if (element.to == window.localStorage.getItem('user')) {
            user = element.user_to.name
            myMessage = 'my-message'
        } else {
            user = element.user_to.name
            myMessage = ' '
        }


        // adiciona novo elemento html ao documento/*lista de mensagens
        this.listMessageElement.innerHTML += `        
            <div class="messages ${myMessage} ">
                <h3>${user} <span> ${element.updatedAt}</span></h3>
                <p>${element.message}</p>
            </div>
        `
        // desce scrol para o final da pagina
        this.listMessageElement.scrollTop = this.listMessageElement.scrollHeight;
    }

    closed() {
        this.chatBackSwitch.addEventListener('click', () => {
            this.chatContainer.style.transform = 'translateX(-100%)'
            window.localStorage.removeItem('by')
        })
    }

    async list() {
        socket.receive('message_all', data => {
            this.listMessageElement.innerHTML = ''
            data.forEach(element => {
                this.add(element)
            })
        })
    }

    async send(message) {
        socket.send('message_send', {
            message,
            user_id: window.localStorage.getItem('user'),
            token: window.localStorage.getItem('token'),
            room: window.localStorage.getItem('by')
        })
    }

    sendEvent() {
        this.sendMessageElement.addEventListener('submit', async e => {

            e.preventDefault()
            const message = e.target.elements.message

            if (!message.value) {
                message.placeholder = 'por favor digite uma mensagem antes de enviar'
                return
            }

            this.send(message.value)

            message.value = ''
        })
        this.received()

    }


    async notification(data) {
        const href = window.location.href
        const path = href.substring(href.lastIndexOf('/') + 1)

        const response = `${data.user_to.name} diz: ${data.message}`

        const user = window.localStorage.getItem('user')

        if (data.from == parseInt(user) && data.to != parseInt(user)) {
            if (
                path != data.user_to.name && data.from == user ||
                path == '/' && data.from == user
            ) {
                if (Notification.permission === "granted") {
                    // If it's okay let's create a notification
                    let notification = new Notification(response);
                }

                // Otherwise, we need to ask the user for permission
                else if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {
                        // If the user accepts, let's create a notification
                        if (permission === "granted") {
                            let notification = new Notification(response);
                        }
                    });
                }
            }
        }

    }

    async received() {
        socket.receive('message_receive', async data => {

            this.notification(data)

            if (
                window.localStorage.getItem('user') == parseInt(data.from) &&
                window.localStorage.getItem('by') == parseInt(data.to) ||
                window.localStorage.getItem('by') == parseInt(data.from) &&
                window.localStorage.getItem('user') == parseInt(data.to)
            ) {
                this.add(data)
            }

        })
    }
}

const message = new Message()

export { message }