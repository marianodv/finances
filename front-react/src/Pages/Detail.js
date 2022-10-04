import React, {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import {getAll} from "../Services/movementsServices"

function Detail(){

    const {id} = useParams()

    return(
        <div>
            DETALLE {id}
        </div>
    )
    
    
}

export default Detail


