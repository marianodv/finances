import React,{useEffect, useState} from "react";
import TopMovement from "./TopMovement";
import {getTopMovements} from '../Services/movementsServices'
import Loading from './Loading'
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom'


function TopMovements(){
    const [loading,setLoading]=useState(true)
    const [listMovements,setListMovements]=useState([])

    const navi = useNavigate()

    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getTopMovements()
                    //console.log("RSP: ",response)
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
            <Table striped onClick={()=>{navi('/movements/')}}>
                <tbody>
                    {listMovements.map((movement,ind) => (<TopMovement key={ind} data={movement} />))}
                </tbody>
            </Table>
        </Loading>
    )
}

export default TopMovements