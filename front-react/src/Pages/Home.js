import React from "react";
import TopMovements from "../Components/TopMovements";
import Balance from "../Components/Balance";
import Movements from "./Movements";

class Home extends React.Component{
    render(){
        return(
            <div>
                <Movements />
                <h1>BIENVENIDOS</h1>
                <Balance />
                <h5>Listado Top</h5>
                <TopMovements />
            </div>
        )
    }
}

export default Home