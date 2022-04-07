import helpers, { QS } from "../../helpers/index.js";
import socket from '../../helpers/Websocket.js'

class NewMessage {
    constructor() {
        // elemento html para recebimento de mensagens
        this.elementHTML = QS('#chat-messages');
    }

    insert(data) {

        //guarda o usuario
        let user = null
        //guarda se a messagem é do usuario atual
        let myMessage = null

        // verifica de quem é a mensagem 
        if (data.to == window.localStorage.getItem('user')) {
            user = data.user_to.name
            myMessage = 'my-message'
        } else {
            user = data.user_to.name
            myMessage = ''
        }


        // adiciona novo elemento html ao documento/*lista de mensagens
        this.elementHTML.innerHTML += `        
            <div class="messages ${myMessage} ">
                <h3>${user} <span> ${data.updatedAt}</span></h3>
                <p>${data.message}</p>
            </div>
        `
        // desce scrol para o final da pagina
        this.elementHTML.scrollTop = this.elementHTML.scrollHeight;
    }
}

export default new NewMessage()

