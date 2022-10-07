import React from "react";
import {useNavigate} from "react-router-dom"
import moment from 'moment';
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"

function Movement(props){

    const {data, onDelete} = props
    const {_id,concept,amount,date,category,isEgress} = data
    const children = props.children

    const navi = useNavigate()

    return(
        <div>
            <p>{children})_{moment(date).format('DD-MM-YYYY') || ''} | {concept || ''} ({category?.name || "Without Category"}) | ${isEgress && <>-</>}{amount || ''}
                <ButtonWithoutLoading variant="edit" onClick={()=>{navi("/movements/edit/" + _id)}}>EDITAR</ButtonWithoutLoading>
                <ButtonWithoutLoading variant="delete" onClick={onDelete || {}}>ELIMINAR</ButtonWithoutLoading>
            </p>
        </div>
    )
}

export default Movement