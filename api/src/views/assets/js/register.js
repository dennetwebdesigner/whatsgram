import { api } from './helpers/api.js'

const signUp = document.querySelector('#sign-up')

signUp.addEventListener('submit', async e => {
    e.preventDefault()

    const name = e.target.elements.name
    const email = e.target.elements.email
    const password = e.target.elements.password

    if (!name.value || !email.value || !password.value) {
        alert('Não pode haver campos vazios')
        return
    }


    const result = await api('post', '/users', {
        name: name.value,
        email: email.value,
        password: password.value
    })

    result.onreadystatechange = () => {
        if (result.readyState == 4) {
            if (result.status == 400)
                alert('Esse email já está em uso, utilize outro por favor.');

            if (result.status == 201)
                alert('Conta criada com sucesso, por favor faça o login');
        }
    }




})