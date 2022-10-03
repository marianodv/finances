import React,{useEffect,useState} from "react";
import {getBalance} from '../Services/balancesService'

function Balance(props){

    const [balance,setBalance] = useState(0)
    const [loading,setLoading] = useState(true)

    useEffect(
        ()=>{
            const request = async () => {
                try{
                    const response = await getBalance()
                    setBalance(response?.data || 0) 
                }catch (error){
                    console.log("Error: ", error)
                }
            }

            request()

            setLoading(false)
        },
        []
    )

    return(
        <>
            { loading &&
                <div>
                    LOADING.....
                </div>
            }
            { !loading &&
                <div>
                    <p>Tienes en Caja: $ {balance}</p>
                </div>
            }
        </>
    )
}

export default Balance