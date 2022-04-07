import { QS } from "../../helpers/index.js"
import socket from "../../helpers/Websocket.js"

// Eventos e funções de uso geral em relação aos contatos do usuario atual
class CommomContacts {

    constructor() {
        this.conversationsElement = QS('#conversations')
        this.contactsMenu = QS('#menu-contacts')

        this.newContactButton = QS('.add-new-contact')
        this.newContactForm = QS('#add-new-contact')
        this.newContactClosed = QS('#closed-new-contact')
        this.newContactInput = QS('#input-email-add')

        this.init()
    }

    init() {
        this.openFormContact()
        this.closeFormContact()
        this.addNewContaxct()
    }

    alphabeticalOrder(contacts) {
        contacts.sort(
            (a, b) => {
                if (a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            }
        );
    }

    // animação aba de formulario abrindo
    openFormContact() {
        this.newContactButton.addEventListener('click', (e) => {
            this.newContactForm.style.transform = 'translateY(0)'
        })
    }

    // animação aba de formulario fechando
    closeFormContact() {
        this.newContactClosed.addEventListener('click', (e) => {
            this.newContactInput.value = ''
            this.newContactForm.style.transform = 'translateY(-100%)'
        })
    }


    // adiciona um novo contato a lista do usuario atual
    addNewContaxct() {
        this.newContactForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const email = e.target.elements.email

            if (!email.value) {
                alert('campo de email não pode ser vazio')
                return
            }

            socket.send('contact-add', {
                token: window.localStorage.getItem('token'),
                email: email.value
            })

            socket.receive('contact-add-response', (data) => {

                if (data.error) {
                    alert('contato já esta na sua lista de amigos')
                }

                this.newContactInput.value = ''
                this.newContactForm.style.transform = 'translateY(-100%)'
            })

        })
    }


}

export default new CommomContacts()