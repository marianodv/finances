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

export async function deleteById(id){
    return await axios.delete('/movements/movement/' + id)
}

export async function updateById(id,data){
    return await axios.put('/movements/movement/' + id,data)
}