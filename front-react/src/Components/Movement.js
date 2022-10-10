import React from "react";
import {useNavigate} from "react-router-dom"
import moment from 'moment';
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"
import toCapitalize from "../utils/toCapitalize"

function Movement(props){

    const {data} = props
    const {_id,concept,amount,date,category,isEgress} = data

    const navi = useNavigate()
    
    return(
        <tr>
            <td>{_id}</td>
            <td>{moment(date).format('DD-MM-YYYY') || ''}</td>
            <td> {toCapitalize(concept || '')}</td>
            <td>{toCapitalize(category?.name || "-")}</td>
            <td>${isEgress && <>-</>}{amount || ''}</td>
            <td>
                <ButtonWithoutLoading variant="edit" onClick={()=>{navi("/movements/edit/" + _id)}}>EDITAR</ButtonWithoutLoading>
            </td>
        </tr>
    )
}

export default Movement