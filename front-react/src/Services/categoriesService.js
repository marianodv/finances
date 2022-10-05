import axios from "../Config/axios"

export async function getAll(){
    return await axios.get('/categories/')
}