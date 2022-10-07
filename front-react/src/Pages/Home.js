import React from "react";
import TopMovements from "../Components/TopMovements";
import Balance from "../Components/Balance";
import {useNavigate} from 'react-router-dom'
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"

function Home(){
    const navi = useNavigate()

        return(
            <div>
                <h1>BIENVENIDOS</h1>
                <Balance />
                <ButtonWithoutLoading variant="create" onClick={()=>{navi("/movements/")}}>VER TODOS</ButtonWithoutLoading>
                <ButtonWithoutLoading variant="view" onClick={()=>{navi("/movements/create/false")}}>AGREGAR INGRESO</ButtonWithoutLoading>
                <ButtonWithoutLoading variant="delete" onClick={()=>{navi("/movements/create/true")}}>AGREGAR EGRESO</ButtonWithoutLoading>
                <h5>Listado Top</h5>
                <TopMovements />
            </div>
        )
}

export default Home