import socket from "../../helpers/Websocket.js";
import NewMessage from "./NewMessage.js";


class ReceivedMessage {
    async init() {
        socket.receive('message_receive', async data => {
            // this.notification(data)
            if (
                window.localStorage.getItem('user') == parseInt(data.from) &&
                window.localStorage.getItem('by') == parseInt(data.to) ||
                window.localStorage.getItem('by') == parseInt(data.from) &&
                window.localStorage.getItem('user') == parseInt(data.to)
            ) {
                NewMessage.insert(data)
            }

        })
    }
}

export default new ReceivedMessage() 