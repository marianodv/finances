import React from "react";
import Movement from "./Movement";

class TopMovements extends React.Component{

    constructor(){
        super()
        this.state={
            listMovements:[
                {
                    _id:1,
                    concept:"gastos1",
                    amount:1255,
                    isEgress:true
                },
                {
                    _id:2,
                    concept:"gastos2",
                    amount:155,
                    isEgress:false
                },
                {
                    _id:3,
                    concept:"gastos3",
                    amount:1258,
                    isEgress:false
                },
                {
                    _id:4,
                    concept:"gastos4",
                    amount:45,
                    isEgress:true
                }
            ]
        }
    }

    handleClickActualizar = ()=>{
        this.setState({
            listMovements:[{
                _id:5,
                concept:"nuevo",
                amount:9999,
                isEgress:true
            }]
        })
    }

    render(){
        return(
            <>
                {this.state.listMovements.map(movement => <Movement id={movement._id} concept={movement.concept} amount={movement.amount} isEgress={movement.isEgress} />)}  
                <button onClick={this.handleClickActualizar}>actualizar movimientos</button>
            </>
        )
    }
}

export default TopMovements