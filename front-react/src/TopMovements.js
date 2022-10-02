import React,{useEffect, useState} from "react";
import Movement from "./Movement";


function TopMovements(){
    const [loading,setLoading]=useState(true)
    const [listMovements,setListMovements]=useState([])

    useEffect(
        ()=>{
            setTimeout(()=>{
                setListMovements([
                    {
                        _id:1,
                        concept:"gastos1",
                        amount:1255,
                        isEgress:true
                    },
                    {
                        _id:2,
                        concept:"gastos2",
                        amount:155,
                        isEgress:false
                    },
                    {
                        _id:3,
                        concept:"gastos3",
                        amount:1258,
                        isEgress:false
                    },
                    {
                        _id:4,
                        concept:"gastos4",
                        amount:45,
                        isEgress:true
                    }
                ])
                    
                setLoading(false)
                
            },2000)
        },
        [] //=== componentDidMount, podria poner el state a monitorear
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
                {listMovements.map(movement => <Movement data={movement} />)}  
                <button onClick={handleClickActualizar}>actualizar movimientos</button>
            </>
        )
    }
}

export default TopMovements