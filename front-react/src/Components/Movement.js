import React from "react";
import {useNavigate} from "react-router-dom"

function Movement(props){

    const {data, onDelete} = props
    const {_id,concept,amount,date,category,isEgress} = data
    const children = props.children

    const navi = useNavigate()

    return(
        <>
            { isEgress &&
                <div>
                    <p>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({category?.name || "Without Category"}) | $-{amount || ''}<button onClick={()=>{navi("/movements/edit/" + _id)}}>EDITAR</button><button onClick={onDelete || {}}>ELIMINAR</button></p>
                </div>
            }
            { !isEgress &&
                <div>
                    <p>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({category?.name || "Without Category"}) | ${amount || ''}<button onClick={()=>{navi("/movements/edit/" + _id)}}>EDITAR</button><button onClick={onDelete || {}}>ELIMINAR</button></p>
                </div>
            }
        </>
    )
}

export default Movement