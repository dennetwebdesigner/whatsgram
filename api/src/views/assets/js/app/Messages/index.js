// Import Classes Messages
/* Adiciona nova mensagem a tela */
import NewMessage from './NewMessage.js';
/* Enviar uma nova mensagem */
import SendMessage from './SendMessage.js';
/* recebe uma nova mensagem */
import ReceivedMessage from './ReceivedMessage.js';
//Eventos comuns js
import CommomMessage from './CommomMessage.js';

// PAra criar notificação Futuramente


// async notification(data) {
//     const href = window.location.href
//     const path = href.substring(href.lastIndexOf('/') + 1)

//     const response = `${data.user_to.name} diz: ${data.message}`

//     const user = window.localStorage.getItem('user')

//     if (data.from == parseInt(user) && data.to != parseInt(user)) {
//         if (
//             path != data.user_to.name && data.from == user ||
//             path == '/' && data.from == user
//         ) {
//             if (Notification.permission === "granted") {
//                 // If it's okay let's create a notification
//                 let notification = new Notification(response);
//             }

//             // Otherwise, we need to ask the user for permission
//             else if (Notification.permission !== 'denied') {
//                 Notification.requestPermission(function (permission) {
//                     // If the user accepts, let's create a notification
//                     if (permission === "granted") {
//                         let notification = new Notification(response);
//                     }
//                 });
//             }
//         }
//     }

// }