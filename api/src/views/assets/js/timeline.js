import { api } from './helpers/api.js'
import { baseUrl } from './helpers/index.js'


const result = await api('GET', `/auth/validate?id=${window.localStorage.getItem('user')}`, null, `bearer ${window.localStorage.getItem('token')}`)

result.onreadystatechange = () => {
    if (result.status != 200) {
        window.location.href = '/entrar'
    }

}

const socket = io(baseUrl, { cors: { origin: '*' } })

socket.emit('newUser', { user: window.localStorage.getItem('user'), token: window.localStorage.getItem('token') })

socket.on('usersList', data => {
    const conversationsElement = document.querySelector('#conversations')
    conversationsElement.innerHTML = ''
    console.log(data)

    data.forEach(element => {

        conversationsElement.innerHTML += `
        <li>
            <img src="${element.img}" alt="imagem de perfil">
            <p>${element.name}</p>
        </li>
        `
    });
})