import React,{useEffect,useState} from "react";
import {getBalance} from '../Services/balancesService'
import Loading from './Loading'
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert'

function Paginate(props){

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
            <Card border="info" style={{ width: '50%',marginLeft:'25%', marginTop:'1rem'}}>
                <Card.Header>Tienes en Caja</Card.Header>
                <Card.Body>
                    <Alert variant={((balance < 0) && "danger") || ((balance >= 0) && "success")}><Alert.Heading>$ {balance}</Alert.Heading></Alert>
                </Card.Body>
            </Card>
        </Loading>
    )
}

export default Paginate