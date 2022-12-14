import React, {useState, useEffect} from "react";
import TopMovements from "../Components/TopMovements";
import Balance from "../Components/Balance";
import {useNavigate} from 'react-router-dom'
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"
import Card from 'react-bootstrap/Card';
import stylesExt from '../styles/cards'
import Modal from 'react-bootstrap/Modal';
import Input from '../Components/Input'
import ButtonWithLoading from '../Components/ButtonWithLoading'
import {count,postMovement} from "../Services/movementsServices"
import {useForm} from "react-hook-form"
import Moment from 'moment';
import WithoutMovements from "../Components/WithoutMovements"

function Home(){
    const navi = useNavigate()

    const [modalShow, setModalShow] = useState(false);

    const [thereAreMovements, setThereAreMovements] = useState(false);

    const { register, handleSubmit, formState:{errors}} = useForm()

    const onSubmit = (data) => {
        const newIngress = async()=>{
            data.date = Moment().format('YYYY-MM-DD')
            data.concept = 'inicio'
            data.category = null
            data.isEgress = false
            console.log("data", data)
            const request = await postMovement(data)
            if (request){
                setModalShow(false)
                setThereAreMovements(true)
            }
        }
        newIngress()
    }

    useEffect(
        ()=>{
            const init = async()=>{
                const quantity = await count()
                //console.log(localStorage.getItem('notShow'))
                //console.log("Q", quantity)
                if (parseInt(quantity.data) === 0 && quantity.data !== null && localStorage.getItem('notShow') !== 'true'){
                    setModalShow(true)
                }else{
                    setThereAreMovements(true)
                }
            }
            init()
        },
        [thereAreMovements]
    )

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Hola! Bienvenid@!   ??Tu primera vez aqui?
                </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                <h2>Parece que no tienes movimientos...</h2>
                
                <h5>Si quieres, podemos crear un nuevo ingreso llamado "INICIO" con lo que tienes
                    de dinero actualmente para mantener tus finanzas ordenadas.
                </h5>
                <div> 
                    <Input type='number' label="Inicio por $" placeholder="Ingrese el monto de inicio" register = {{...register("amount",{required:true,min:0})}}/>
                    {errors?.amount?.type === 'required' && <span>El monto es un valor obligatorio.</span>}
                    {errors?.amount?.type === 'min' && <span>El monto debe ser mayor a cero.</span>}
                </div>
                </Modal.Body>
                <Modal.Footer>
                <ButtonWithLoading variant="secondary" onClick={()=>{setModalShow(false);localStorage.setItem('notShow', 'true');}}>No por el momento</ButtonWithLoading>
                <ButtonWithLoading variant="success" onClick={handleSubmit(onSubmit)}>GUARDAR</ButtonWithLoading>
                </Modal.Footer>
            </Modal>
        );
    }

    return(
        <div>
            <Balance />

            <Card border='light'>
                <Card.Body>
                <ButtonWithoutLoading variant="create" image="movements" onClick={()=>{navi("/movements/")}}>VER TODOS LOS MOVIMIENTOS</ButtonWithoutLoading>{'  '}
                <ButtonWithoutLoading variant="info" image="categories" onClick={()=>{navi("/categories/")}}>VER TODAS LAS CATEGORIAS</ButtonWithoutLoading> 
                </Card.Body>
            </Card>
            
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
                    
            <Card style={stylesExt.cardContainer}>
                <Card.Body>
                    <Card.Title>Tus ultimos movimientos...</Card.Title>
                    {thereAreMovements &&
                        <TopMovements />
                    }
                    {!thereAreMovements &&
                        <WithoutMovements />
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default Home