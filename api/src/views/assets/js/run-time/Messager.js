import Api from '../helpers/api.js'
import Helpers, { QS } from '../helpers/index.js'
import socket from '../helpers/Websocket.js';
// const socket = Helpers.socket()

class Message {

    constructor() {
        // elemento html para recebimento de mensagens
        this.listMessageElement = QS('#chat-messages');
        // formulario html para envio de novas mensagens 
        this.sendMessageElement = QS('#send-message')
        this.list()
        this.sendEvent()

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

    async send(message) {
        await socket.send('message_send', {
            message,
            user_id: window.localStorage.getItem('user'),
            token: window.localStorage.getItem('token'),
            room: window.localStorage.getItem('by')
        })
    }

    async received() {
        socket.on('message_receive', async data => {
            console.log('->')

            let response = ''


            const result = await Api.connect('GET', `/users/${data.from}`, null, `bearer ${window.localStorage.getItem('token')}`)

            result.onreadystatechange = () => {
                console.log('teste')

                if (result.readyState == 4 && result.status == 200) {

                    response = `${JSON.parse(result.response.toString()).name}: ${data.message}`

                    const user = window.localStorage.getItem('user')

                    if (data.from == user && !data.to == user) {
                        if (Notification.permission === "granted") {
                            // If it's okay let's create a notification
                            var notification = new Notification(response);
                        }

                        // Otherwise, we need to ask the user for permission
                        else if (Notification.permission !== 'denied') {
                            Notification.requestPermission(function (permission) {
                                // If the user accepts, let's create a notification
                                if (permission === "granted") {
                                    var notification = new Notification(response);
                                }
                            });
                        }
                    }
                }

            }

            if (
                window.localStorage.getItem('user') == parseInt(data.from) &&
                window.localStorage.getItem('by') == parseInt(data.to) ||
                window.localStorage.getItem('by') == parseInt(data.from) &&
                window.localStorage.getItem('user') == parseInt(data.to)
            ) {

                this.setMessageHTML(data)
            }


        })
    }

    async add() {

    }

    async list() {
        socket.receive('message_all', data => {
            this.listMessageElement.innerHTML = ''
            data.forEach(element => {
                this.setMessageHTML(element)
            })

        })
    }

    setMessageHTML = (element) => {
        // verifia de quem é a mensagem
        let myMessage = element.user.id == parseInt(window.localStorage.getItem('user')) ? 'my-message' : ''
        ''

        // adiciona novo elemento html ao documento/*lista de mensagens
        this.listMessageElement.innerHTML += `        
            <div class="messages ${myMessage} ">
                <h3>${element.user.name} <span> ${element.updatedAt}</span></h3>
                <p>${element.message}</p>
            </div>
        `
        // desce scrol para o final da pagina
        this.listMessageElement.scrollTop = this.listMessageElement.scrollHeight;
    }

}

export default Message