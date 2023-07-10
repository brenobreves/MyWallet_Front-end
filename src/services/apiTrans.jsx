import axios from "axios";

const BASE_URL = "http://localhost:5000"

function createConfig(token){
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function postTrans(token,body, tipo){
    
    const promise = axios.post(`${BASE_URL}/trans/${tipo}`, body, createConfig(token))
    return promise
}

function getTrans(token){
    const promise = axios.get(`${BASE_URL}/transactions`, createConfig(token))
    return promise
}

const apiTrans = {postTrans , getTrans}
export default apiTrans