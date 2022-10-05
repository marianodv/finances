import axios from "../Config/axios"

export async function postMovement(data){
    return await axios.post("/movements/",data)
}