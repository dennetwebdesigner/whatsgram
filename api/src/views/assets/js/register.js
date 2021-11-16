import Api from './helpers/api.js'
import { QS } from './helpers/index.js'

// captura elemento html
const signUp = QS('#sign-up')

// adiciona evento de envio de formulario
signUp.addEventListener('submit', async e => {

    e.preventDefault()

    // caputura inputs
    const name = e.target.elements.name
    const email = e.target.elements.email
    const password = e.target.elements.password

    // vaerifica se não esta vazio
    if (!name.value || !email.value || !password.value) {
        alert('Não pode haver campos vazios')
        return
    }

    // conecta a api para registro de novo usuario
    const result = await Api.connect('post', '/users', {
        name: name.value,
        email: email.value,
        password: password.value
    })


    result.onreadystatechange = async() => {

        if (result.readyState == 4) {


            // caso email já esteja cadastrado
            if (result.status == 400)
                alert('Esse email já está em uso, utilize outro por favor.');

            // caso usuario seja cadastrado com sucesso
            if (result.status == 201) {

                // conecta api para realização de login
                const login = await Api.connect('post', '/auth', {
                    email: email.value,
                    password: password.value
                })

                login.onreadystatechange = async() => {

                    if (login.readyState == 4) {

                        // caso login seja realizado com sucesso
                        if (login.status == 200) {

                            // caputura token e id de usuario
                            const { user, token } = JSON.parse(login.responseText)

                            // adiciona ao localStorage
                            await window.localStorage.setItem('token', token)
                            await window.localStorage.setItem('user', user)

                            // redireciona para pagina inicial
                            window.location.href = '/'


                        } else {
                            // caso não seja possivel realizar o login
                            alert('Não conseguimos realizar seu login, tente novamente!')
                        }
                    }
                }
            }
        }
    }

})