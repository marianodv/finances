import React from "react";
import {Link} from "react-router-dom"

function Movement(props){

    const {_id,concept,amount,date,category,isEgress} = props.data
    const children = props.children

    return(
        <>
            { isEgress &&
                <div>
                    <p><Link to={"/movements/detail/" + _id}>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({category?.name || "Without Category"}) | $-{amount || ''}</Link></p>
                </div>
            }
            { !isEgress &&
                <div>
                    <p><Link to={"/movements/detail/" + _id}>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({category?.name || "Without Category"}) | ${amount || ''}</Link></p>
                </div>
            }
        </>
    )
}

export default Movement