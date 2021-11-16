import Helpers from './index.js'

export default class Api {
    static async connect(flag,
        url,
        data = null,
        token = null,
        permission = null
    ) {

        // instancia uma requisição XMLHTTP
        this.xmlhttp = new XMLHttpRequest(); // new HttpRequest  

        // verifica as permissões
        if (permission)
            this.xmlhttp.open(flag, `${Helpers.getBaseUrl()}/api${url}`, permission);
        else
            this.xmlhttp.open(flag, `${Helpers.getBaseUrl()}/api${url}`);


        // caso exista um token seta automaticamente no header da requisição
        if (token)
            this.xmlhttp.setRequestHeader("Authorization", token);

        // caso exista corpo de requisição
        if (data) {
            this.xmlhttp.setRequestHeader("Content-Type", "application/json")
            this.xmlhttp.send(JSON.stringify(data));
        } else
            this.xmlhttp.send();

        return this.xmlhttp
    }
}