import axios from "../Config/axios"

export async function getTopMovements(){
    return await axios.get('/movements/top/')
}

export async function getAll(){
    return await axios.get('/movements/')
}