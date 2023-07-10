import axios from "axios";

function signIn(body){
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, body)
    return promise

}

function signUp(body){
    const promise = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, body)
    return promise
}

const apiAuth = {signIn , signUp}
export default apiAuth