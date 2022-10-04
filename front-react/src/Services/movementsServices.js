import axios from "../Config/axios"

export async function getTopMovements(){
    return await axios.get('/movements/top/')
}

export async function getAll(){
    return await axios.get('/movements/')
}

export async function getById(id){
    return await axios.get('/movements/movement/' + id)
}