// import conexão com api
import Api from './helpers/api.js'
import { QS } from './helpers/index.js'

// caputra formulario html
const signIn = QS('#sign-in')


// adiciona evento de envio de formulario
signIn.addEventListener('submit', async e => {

    e.preventDefault()

    // captura dados do formulario
    const email = e.target.elements.email
    const password = e.target.elements.password

    // verifica se os inputs estão vazios
    if (!email.value || !password.value) {
        alert('Não pode haver campos vazios')
        return
    }

    // conecta a api para realização de login
    const result = await Api.connect('post', '/auth', {
        email: email.value,
        password: password.value
    })


    result.onreadystatechange = () => {
        if (result.readyState == 4) {

            // caso email n seja cadastrado
            if (result.status == 404)
                alert('Esse email não está cadastrado, utilize outro por favor.');

            // login efetuado com sucesso
            if (result.status == 200) {

                // gurada no local storage
                const { user, token } = JSON.parse(result.responseText)
                window.localStorage.setItem('token', token)
                window.localStorage.setItem('user', user)

                // redireciona para pagina inicial
                window.location.href = '/'
            }
        }
    }




})