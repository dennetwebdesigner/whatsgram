import { QS } from "../../helpers/index.js"
import socket from "../../helpers/Websocket.js"

// Cria elemento e evento de click para indicar e abrir bate papo privado
class CommomConversations {

    constructor() {
        this.conversationsElement = QS('#conversations')
        this.mensagesMenu = QS('#menu-messages')
    }

    // cria e adiciona ao html conversa já existentes 
    createItemListHTML = (element) => {

        const li = document.createElement('li')
        li.classList.add('chat-conversation')

        const img = document.createElement('img')
        img.alt = 'imagem de perfil'

        const p = document.createElement('p')


        img.src = element.img

        p.textContent = element.name

        li.appendChild(img)
        li.appendChild(p)

        this.conversationsElement.appendChild(li)

        li.addEventListener('click', (e) => this.handleClickCoversation(e, element))
    }

    // bare bate papo privado ao clicar no elemento html
    handleClickCoversation(e, element) {
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

export default new CommomConversations()