import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import {getById} from "../Services/movementsServices"

function Detail(){

    const {id} = useParams()

    const [loading,setLoading] = useState(true)
    const [movement,setMovement] = useState({})

    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getById(id)
                    console.log("Mov: ",response?.data)
                    setMovement(response?.data)
                    
                    setLoading(false)
                }catch (error){
                    console.log("Error: ", error)
                }
            }
            request()
        },
        []
    )


    if(loading){
        return(
            <>
                loading....
            </>
        )
    }else{
        return(
            <div>
                deltalle {movement._id} {movement.concept} ${movement.amount}
            </div>
        )
    }
    
}

export default Detail


