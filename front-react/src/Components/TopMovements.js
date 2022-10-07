import React,{useEffect, useState} from "react";
import TopMovement from "./TopMovement";
import {getTopMovements} from '../Services/movementsServices'
import Loading from './Loading'
import Table from 'react-bootstrap/Table';

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
                    
                    setLoading(false)
                }catch (error){
                    console.log("Error: ", error)
                }
            }
            
            request()
        },
        [] 
    )
    
    return(
        <Loading loading={loading}>
            <Table striped>
                <tbody>
                    {listMovements.map((movement,ind) => (<TopMovement key={ind} data={movement} />))}
                </tbody>
            </Table>
        </Loading>
    )
}

export default TopMovements