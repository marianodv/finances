import React,{useEffect, useState} from "react";
import Movement from "./Movement";
import {getTopMovements} from '../Services/movementsServices'

function TopMovements(){
    const [loading,setLoading]=useState(true)
    const [listMovements,setListMovements]=useState([])

    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getTopMovements()
                    console.log("RSP: ",response)
                    setListMovements(response?.data)
                }catch (error){
                    console.log("Error: ", error)
                }
            }
            
            request()
                
            setLoading(false)
        },
        [] //=== componentDidMount, podria poner el nombre del state a monitorear simil al DidUpdate
    )

    const handleClickActualizar = ()=>{
        setListMovements([{
                _id:5,
                concept:"nuevo",
                amount:9999,
                date:'2022-29-09',
                categoryId:34,
                isEgress:true
            }]
        )
    }
    

    if(loading){
        return(
            <>
                <div>
                    CARGANDO...
                </div>
            </>
        )
    }else{
        return(
            <>
                {listMovements.map((movement,ind) => <Movement key={ind} data={movement}>{ind+1}</Movement>)}  
                <button onClick={handleClickActualizar}>actualizar movimientos</button>
            </>
        )
    }
}

export default TopMovements