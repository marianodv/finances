import React from "react";
import {useNavigate} from "react-router-dom"
import moment from 'moment';
import toCapitalize from "../utils/toCapitalize"

function Movement(props){

    const {data} = props
    const {_id,concept,amount,date,category,isEgress} = data

    const navi = useNavigate()
    
    return(
        
        <tr onClick={()=>{navi("/movements/edit/" + _id)}}>
            <td>{_id}</td>
            <td>{moment(date).format('DD-MM-YYYY') || ''}</td>
            <td> {toCapitalize(concept || '')}</td>
            <td>{toCapitalize(category?.name || "-")}</td>
            <td>${isEgress && <>-</>}{amount || ''}</td>
        </tr>
        
    )
}

export default Movement