import React from "react";

function Movement(props){

    const {concept,amount,date,categoryId,isEgress} = props.data

    return(
        <div>
            <p>{concept || ''}</p>
            <p>{amount || ''}</p>
            <p>{date || ''}</p>
            <p>{categoryId || ''}</p>
            <p>{isEgress || true}</p>
        </div>
    )
}

export default Movement