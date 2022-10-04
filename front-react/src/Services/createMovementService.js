import axios from "../Config/axios"

export async function postMovement(){
    return await axios.get('/movements/top/')
}