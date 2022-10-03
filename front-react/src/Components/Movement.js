import React from "react";


function Movement(props){

    const {concept,amount,date,categoryId,isEgress} = props.data

    return(
        <>
            { isEgress &&
                <div>
                    <p>{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({categoryId || ''}) | $-{amount || ''}</p>
                </div>
            }
            { !isEgress &&
                <div>
                    <p>{new Date(date).toLocaleDateString() || ''} | {concept || ''} ({categoryId || ''}) | ${amount || ''}</p>
                </div>
            }
        </>
    )
}

export default Movement