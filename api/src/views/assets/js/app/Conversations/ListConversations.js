import { QS } from '../../helpers/index.js'
import CommomConversations from './CommomConversations.js'

// separa e lista cada conversa já existente
class ListConversations {
    constructor() {
        this.conversationsElement = QS('#conversations')
        this.mensagesMenu = QS('#menu-messages')

    }

    // inicia a lista e seta evento de clique ao icone do menu de conversas
    init(data) {
        this.listConversations(data)
        this.handleClickMenuConversations(data)
    }

    // lista conversas ja existentes
    listConversations(data) {
        data.forEach(element => {
            CommomConversations.createItemListHTML(element)
        })
    }

    // abre lista de conversas ja existentes
    handleClickMenuConversations(data) {
        this.mensagesMenu.addEventListener('click', () => {
            this.conversationsElement.innerHTML = ''
            this.listConversations(data)
        })

    }


}

export default new ListConversations()