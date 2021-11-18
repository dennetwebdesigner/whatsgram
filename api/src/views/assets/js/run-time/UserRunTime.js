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

// document.addEventListener("visibilitychange", function() {
//     if (document.visibilityState == 'hidden') {
//         console.log('hidden')
//     }
// }, false);


const user = new User()

export { user }