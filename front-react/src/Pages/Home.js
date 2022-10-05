import React from "react";
import TopMovements from "../Components/TopMovements";
import Balance from "../Components/Balance";
import {useNavigate} from 'react-router-dom'

function Home(){
    const navi = useNavigate()

        return(
            <div>
                <h1>BIENVENIDOS</h1>
                <Balance />
                <button onClick={()=>{navi("/movements/create/false")}}>AGREGAR INGRESO</button>
                <button onClick={()=>{navi("/movements/create/true")}}>AGREGAR EGRESO</button>
                <h5>Listado Top</h5>
                <TopMovements />
            </div>
        )
}

export default Home