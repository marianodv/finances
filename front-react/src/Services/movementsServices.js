import axios from "../Config/axios"

export async function getTopMovements(){
    return axios.get('http://localhost:3000/movements/top')
}