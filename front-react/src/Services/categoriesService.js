import axios from "../Config/axios"

export async function getAll(){
    return await axios.get('/categories/')
}

export async function newCategory(data){
    return await axios.post('/categories/',data)
}

export async function deleteById(id){
    return await axios.delete('/categories/category/' + id)
}

export async function updateById(id, data){
    return await axios.put('/categories/category/' + id, data)
}