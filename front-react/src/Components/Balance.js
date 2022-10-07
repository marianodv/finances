import React,{useEffect,useState} from "react";
import {getBalance} from '../Services/balancesService'
import Loading from './Loading'
import Card from 'react-bootstrap/Card';

function Balance(props){

    const [balance,setBalance] = useState(0)
    const [loading,setLoading] = useState(true)

    useEffect(
        ()=>{
            const request = async () => {
                try{
                    const response = await getBalance()
                    setBalance(response?.data || 0) 

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
            <Card border="info" /*style={{ width: '18rem'}}*/>
                <Card.Header>Tienes en Caja</Card.Header>
                <Card.Body>
                    <Card.Title>$ {balance}</Card.Title>
                </Card.Body>
            </Card>
        </Loading>
    )
}

export default Balance