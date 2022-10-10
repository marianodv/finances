import React from "react";
import TopMovements from "../Components/TopMovements";
import Balance from "../Components/Balance";
import {useNavigate} from 'react-router-dom'
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"
import Card from 'react-bootstrap/Card';
import stylesExt from '../styles/cards'

function Home(){
    const navi = useNavigate()

        return(
            <div>
                <Balance />

                <Card border='dark' style={stylesExt.cardContainer}>
                    <Card.Body>
                    <ButtonWithoutLoading variant="create" onClick={()=>{navi("/movements/")}} style={{marginTop:'1rem'}}>VER TODOS LOS MOVIMIENTOS</ButtonWithoutLoading>
                    <ButtonWithoutLoading variant="info" onClick={()=>{navi("/categories/")}} style={{marginTop:'1rem'}}>VER TODAS LAS CATEGORIAS</ButtonWithoutLoading> 
                    </Card.Body>
                </Card>
                               
                <Card style={stylesExt.cardContainer}>
                    <Card.Body>
                        <Card.Title>Tus ultimos movimientos...</Card.Title>
                        <TopMovements />
                    </Card.Body>
                </Card>
            </div>
        )
}

export default Home