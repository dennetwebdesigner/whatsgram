import { baseUrl } from './index.js'

export const api = async(
    flag,
    url,
    data = null,
    callback,
    auth = null,
    permission = null
) => {
    const xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
    if (permission)
        xmlhttp.open(flag, `${baseUrl}/api${url}`, true)
    else
        xmlhttp.open(flag, `${baseUrl}/api${url}`)


    xmlhttp.setRequestHeader("Content-Type", "application/json");

    if (auth)
        xmlhttp.setRequestHeader(auth.key, auth.value);
    if (data)
        xmlhttp.send(JSON.stringify(data));
    return xmlhttp
}