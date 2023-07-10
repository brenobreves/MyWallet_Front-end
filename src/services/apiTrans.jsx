import axios from "axios";

const BASE_URL = "http://localhost:5000"

function createConfig(token){
    return {
        headers: {
            token: `Bearer ${token}`
        }
    }
}

function postTrans(token,body, tipo){
    
    const promise = axios.post(`${BASE_URL}/trans/${tipo}`, body, createConfig(token))
    return promise
}

const apiTrans = {postTrans}
export default apiTrans