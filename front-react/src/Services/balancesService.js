import axios from "../Config/axios"

export async function getBalance(){
    return await axios.get('/movements/balance/')
}