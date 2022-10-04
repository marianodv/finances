import React, {useEffect,useState} from "react";
import Movement from "../Components/Movement";
import {getAll} from "../Services/movementsServices"

function Movements(){

    const [loading,setLoading] = useState(true)
    const [movements,setMovements] = useState([])

    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getAll()
                    console.log("LST: ",response?.data)
                    setMovements(response?.data)

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
                {movements?.rows.map((movement,ind) => <Movement key={ind} data={movement}>{ind+1}</Movement>)}  
                <p>{movements?.pageMin} to page {movements?.page} to {movements?.pageMax} | TOTAL: {movements?.rowsCount} | listed: {movements?.rowsPerPage}</p>
            </div>
        )
    }
    
}

export default Movements


