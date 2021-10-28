import { api } from './helpers/api.js'

const signIn = document.querySelector('#sign-in')

signIn.addEventListener('submit', async e => {
    e.preventDefault()

    const email = e.target.elements.email
    const password = e.target.elements.password

    if (!email.value || !password.value) {
        alert('Não pode haver campos vazios')
        return
    }


    const result = await api('post', '/auth', {
        email: email.value,
        password: password.value
    })

    result.onreadystatechange = () => {
        if (result.readyState == 4) {
            if (result.status == 404)
                alert('Esse email não está cadastrado, utilize outro por favor.');

            if (result.status == 200) {
                const { user, token } = JSON.parse(result.responseText)
                window.localStorage.setItem('token', token)
                window.localStorage.setItem('user', user)
            }
        }
    }




})