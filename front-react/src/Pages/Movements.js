import React, {useEffect,useState} from "react";
import Movement from "../Components/Movement";


function Movements(){

    const [loading,setLoading] = useState(true)

    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getTopMovements()
                    console.log("RSP: ",response)
                    setListMovements(response?.data)

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
                <hr></hr>
                <h1>(listado de movimientos)</h1>
                <hr></hr>
            </div>
        )
    }
    
}

export default Movements


