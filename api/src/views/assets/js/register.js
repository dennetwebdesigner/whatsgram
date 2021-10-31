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

    result.onreadystatechange = async() => {
        if (result.readyState == 4) {
            if (result.status == 400)
                alert('Esse email já está em uso, utilize outro por favor.');

            if (result.status == 201) {

                const login = await api('post', '/auth', {
                    email: email.value,
                    password: password.value
                })

                login.onreadystatechange = async() => {
                    if (login.readyState == 4) {
                        if (login.status == 200) {

                            const { user, token } = JSON.parse(login.responseText)
                            await window.localStorage.setItem('token', token)
                            await window.localStorage.setItem('user', user)

                            window.location.href = '/'


                        }
                    }
                }


            }
        }
    }




})