import React from "react";
import TopMovements from "../Components/TopMovements";
import Balance from "../Components/Balance";
import {useNavigate} from 'react-router-dom'
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"
import Card from 'react-bootstrap/Card';

const styles={
    card:{
        width: '80%',
        marginLeft:'10%',
        marginTop:'1rem'
    },
    buttons:{
        margin:'10px'
    }
}

function Home(){
    const navi = useNavigate()

        return(
            <div>
                <Balance />

                <div style={styles.buttons}>
                    <ButtonWithoutLoading variant="create" onClick={()=>{navi("/movements/")}} style={{marginLeft:'20px'}}>VER TODOS</ButtonWithoutLoading>

                    <ButtonWithoutLoading variant="view" onClick={()=>{navi("/movements/create/false")}}>AGREGAR INGRESO</ButtonWithoutLoading>

                    <ButtonWithoutLoading variant="delete" onClick={()=>{navi("/movements/create/true")}}>AGREGAR EGRESO</ButtonWithoutLoading>
                </div>
                
                <Card style={styles.card}>
                    <Card.Body>
                        <Card.Title>Listado Top</Card.Title>
                        <TopMovements />
                    </Card.Body>
                </Card>
            </div>
        )
}

export default Home