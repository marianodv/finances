import axios from "../Config/axios"

export async function getAll(){
    return await axios.get('/categories/')
}

export async function newCategory(data){
    return await axios.post('/categories/',data)
}