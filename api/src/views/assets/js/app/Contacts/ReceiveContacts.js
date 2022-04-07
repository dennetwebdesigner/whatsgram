import socket from "../../helpers/Websocket.js"

class ReceiveContacts {

    constructor() {
        this.signRequestContacts = 'contact-list'
        this.signReceiveContacts = 'contact-list-response'
    }
    ReceiveListConversations
    async init() {
        await this.requestListContacts()
        let contacts = []
        await socket.receive(this.signReceiveContacts, async (data) => {
            await data.map(contact => {
                contacts.push(contact['user-from'])
            })
        })

        return contacts
    }

    async requestListContacts() {
        await socket.send(this.signRequestContacts, { token: window.localStorage.getItem('token') })
    }

}

export default new ReceiveContacts()