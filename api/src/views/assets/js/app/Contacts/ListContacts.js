import { QS } from "../../helpers/index.js"
import ReceiveContacts from "./ReceiveContacts.js"
import CommomContacts from "./CommomContacts.js"
import CommomConversations from "../Conversations/CommomConversations.js"
import ReceiveListConversations from "../Conversations/ReceiveListConversations.js"

//  Responsavel por mostrar na tela e abrir uma nova conversa com contato selecionado
class ListContacts {
    constructor() {
        this.conversationsElement = QS('#conversations')
        this.contactsMenu = QS('#menu-contacts')
        this.init()
    }

    async init() {

        let contacts = await ReceiveContacts.init()


        this.contactsMenu.addEventListener('click', () => {

            // Lista de contatos em ordem alfabetica
            CommomContacts.alphabeticalOrder(contacts)

            // Limpa lista de elemento html
            this.conversationsElement.innerHTML = ''

            // Lista todos contatos da lista do usuario atual
            contacts.forEach(contact => {
                // cria e retorna elemento html li 
                const li = this.createListItemElemenHTML(contact)

                // abre uma nova conversa privada com o contato selecionado
                li.addEventListener('click', (event) => this.handleClickNewConversation(event, contact))
            })
        })
    }

    // cria e retorna elemento html li 
    createListItemElemenHTML(contact) {
        const li = document.createElement('li')
        li.classList.add('chat-conversation')

        const img = document.createElement('img')
        img.alt = 'imagem de perfil'
        img.src = contact.img

        const p = document.createElement('p')
        p.textContent = contact.name

        li.appendChild(img)
        li.appendChild(p)

        this.conversationsElement.appendChild(li)

        return li
    }

    // abre uma nova conversa privada com o contato selecionado
    handleClickNewConversation(event, contact) {

        // ativa a janela de bate papo privado usando classe CommomConversations
        CommomConversations.handleClickCoversation(event, contact)

        // retorna todos os contatos usando classReceiveListConversations
        ReceiveListConversations.data.forEach(item => {

            // Mostra na tela todos os contatos usando a classe CommomConversations
            CommomConversations.conversationsElement.innerHTML = ''
            CommomConversations.createItemListHTML(item)

        })

    }
}

export default new ListContacts()