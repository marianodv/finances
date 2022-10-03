import React,{useEffect,useState} from "react";
import {getBalance} from '../Services/balancesService'

function Balance(props){

    const [balance,setBalance] = useState(0)
    const [loading,setLoading] = useState(true)

    const {concept,amount,date,categoryId,isEgress} = props.data

    useEffect(
        ()=>{
            const request = async () => {
                const response = await getBalance()
                console.log(response)
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