import { baseUrl } from './index.js'

export const api = async(
    flag,
    url,
    data = null,
    token = null,
    permission = null
) => {
    const xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 

    if (permission)
        xmlhttp.open(flag, `${baseUrl}/api${url}`, true)
    else
        xmlhttp.open(flag, `${baseUrl}/api${url}`)




    if (token) {
        xmlhttp.setRequestHeader("Authorization", token);
    }

    if (data) {
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(data));
    } else {
        xmlhttp.send();
    }
    return xmlhttp
}