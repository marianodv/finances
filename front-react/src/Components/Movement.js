import React from "react";


function Movement(props){

    const {concept,amount,date,categoryId,isEgress} = props.data
    const children = props.children

    return(
        <>
            { isEgress &&
                <div>
                    <p>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({categoryId || ''}) | $-{amount || ''}</p>
                </div>
            }
            { !isEgress &&
                <div>
                    <p>{children})_{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({categoryId || ''}) | ${amount || ''}</p>
                </div>
            }
        </>
    )
}

export default Movement