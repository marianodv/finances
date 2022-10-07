import React from "react";
import moment from 'moment';

function TopMovement(props){

    const {concept,amount,date,category,isEgress} = props.data
    const children = props.children

    return(
        <>
            { isEgress &&
                <div>
                    <h4>{children})_{moment(date).format('DD-MM-YYYY') || ''} | {concept || ''} ({category?.name || "Without Category"}) | $-{amount || ''}</h4>
                </div>
            }
            { !isEgress &&
                <div>
                    <h3>{children})_{moment(date).format('DD-MM-YYYY') || ''} | {concept || ''} ({category?.name || "Without Category"}) | ${amount || ''}</h3>
                </div>
            }
        </>
    )
}

export default TopMovement