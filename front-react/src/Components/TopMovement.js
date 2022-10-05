import React from "react";


function TopMovement(props){

    const {concept,amount,date,category,isEgress} = props.data
    const children = props.children

    return(
        <>
            { isEgress &&
                <div>
                    <h4>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({category?.name || "Without Category"}) | $-{amount || ''}</h4>
                </div>
            }
            { !isEgress &&
                <div>
                    <h3>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({category?.name || "Without Category"}) | ${amount || ''}</h3>
                </div>
            }
        </>
    )
}

export default TopMovement