import axios from "axios";

function createConfig(token){
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

function postTrans(token,body, tipo){
    
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/trans/${tipo}`, body, createConfig(token))
    return promise
}

function getTrans(token){
    const promise = axios.get(`${import.meta.env.VITE_API_URL}/transactions`, createConfig(token))
    return promise
}

const apiTrans = {postTrans , getTrans}
export default apiTrans