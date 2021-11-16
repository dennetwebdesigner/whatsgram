import Api from '../helpers/api.js'
import Helpers, { QS } from '../helpers/index.js'
import socket from '../helpers/Websocket.js'


class User {
    constructor() {
        this.add()
        this.list()

        this.conversationsElement = QS('#conversations')
    }

    add() {
        // adiciona um novo usuario a lista do servidor
        socket.send('newUser', { user: window.localStorage.getItem('user'), token: window.localStorage.getItem('token') })
    }

    async list() {
        socket.receive('usersList', data => {
            this.conversationsElement.innerHTML = ''
            this.listCallback(data)

        })
    }

    resolve(data, callback) {
        data.forEach(callback)
    }

    listCallback(data) {
        this.resolve(
            data, (element => {

                const li = document.createElement('li')
                li.classList.add('chat-conversation')

                const img = document.createElement('img')
                img.alt = 'imagem de perfil'
                img.src = element.img

                const p = document.createElement('p')
                p.textContent = element.name

                li.appendChild(img)
                li.appendChild(p)

                this.conversationsElement.appendChild(li)



                li.addEventListener('click', (e) => this.listEvent(e, element))
            })
        )
    }

    listEvent(e, element) {
        const chatContainer = QS('#chat-content')
        window.localStorage.setItem('by', element.id)

        chatContainer.style.transform = 'translateX(0%)'
        window.history.pushState({ page: "chat-private" },
            "chat-private", element.name)

        const href = window.location.href
        const path = href.substring(href.lastIndexOf('/') + 1)

        const nameElement = QS('#chat-content header h2')
        nameElement.innerHTML = element.name
        const from = window.localStorage.getItem('by')

        document.head.tittle = `whatsgram - ${element.name}`

        socket.send('select_messages', {
            user_id: window.localStorage.getItem('user'),
            token: window.localStorage.getItem('token'),
            room: from
        })

    }
}

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
        socket.send('message_send', {
            message,
            user_id: window.localStorage.getItem('user'),
            token: window.localStorage.getItem('token'),
            room: window.localStorage.getItem('by')
        })
    }

    async received() {
        socket.receive('message_receive', async data => {


            let response = ''


            const result = await Api.connect('GET', `/users/${data.to}`, null, `bearer ${window.localStorage.getItem('token')}`)


            result.onreadystatechange = () => {

                if (result.readyState == 4 && result.status == 200) {

                    response = `${JSON.parse(result.response.toString()).name} diz: ${data.message}`

                    const user = window.localStorage.getItem('user')

                    if (data.from == parseInt(user) && data.to != parseInt(user)) {
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

        let user = null
        let myMessage = null

        // verifia de quem é a mensagem 
        if (element.to != window.localStorage.getItem('user')) {
            user = element.user_from
            myMessage = ' '
        } else {
            user = element.user_to
            myMessage = 'my-message'
        }

        // adiciona novo elemento html ao documento/*lista de mensagens
        this.listMessageElement.innerHTML += `        
            <div class="messages ${myMessage} ">
                <h3>${user.name} <span> ${element.updatedAt}</span></h3>
                <p>${element.message}</p>
            </div>
        `
        // desce scrol para o final da pagina
        this.listMessageElement.scrollTop = this.listMessageElement.scrollHeight;
    }

}

// document.addEventListener("visibilitychange", function() {
//     if (document.visibilityState == 'hidden') {
//         console.log('hidden')
//     }
// }, false);


const user = new User()
const message = new Message()
export { user, message }