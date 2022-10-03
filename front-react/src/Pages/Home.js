import React from "react";
import TopMovements from "../Components/TopMovements";

class Home extends React.Component{
    render(){
        return(
            <div>
                <h1>BIENVENIDOS</h1>
                <h5>Listado Top</h5>
                <TopMovements />
            </div>
        )
    }
}

export default Home