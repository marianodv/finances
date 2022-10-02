import React from "react";
import TopMovements from "./TopMovements";

class Home extends React.Component{
    render(){
        return(
            <div>
                <h3>Listado Top</h3>
                <TopMovements />
            </div>
        )
    }
}

export default Home