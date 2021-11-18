import Api from './api.js'
class Helpers {
    constructor() {
        // NGROK
        // this.protocol = 'https://'
        // this.host = '729d-179-191-20-156.ngrok.io'
        // this.port = ''

        // TEST
        // protocolo http
        this.protocol = 'http://'
        // host/dominio
        this.host = 'localhost'
        // porta da aplicação caso necessario
        this.port = ':3000'

        this.baseUrl = `${this.protocol}${this.host}${this.port}`
    }

    // captura url padrão 
    getBaseUrl() {
        return this.baseUrl
    }


    // autentificação de usurio
    async authentification() {
        // conecta-se a api para 
        const result = await Api.connect('GET', `/auth/validate?id=${window.localStorage.getItem('user')}`, null, `bearer ${window.localStorage.getItem('token')}`)

        // caso usuario ou token não sejam reconhecidos
        result.onreadystatechange = () => {

            if (result.status != 200) {
                window.location.href = '/entrar'
            }

        }
    }


}

// caputra elemento HTML
export const QS = (element) => {
    return document.querySelector(element)
}

export default new Helpers()