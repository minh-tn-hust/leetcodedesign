import axios from 'axios';

const BASE_URL = "http://localhost:3001";

const getHeader = function () {
    let access_token;
    let header;
    if (access_token) {
        header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
            'Accept' : '*/*',
            'Access-Control-Allow-Origin': '*'
        }
    } else {
        header = {
            'Content-Type': 'application/json',
            'Accept' : "*/*",
            'Access-Control-Allow-Origin': '*'
        }
    }
    console.log(header);
    return header;
}

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: getHeader(),
    validateStatus: false
});

export default api;
