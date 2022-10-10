import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form"
import {postMovement} from "../Services/movementsServices"
import Moment from 'moment';
import { useParams } from "react-router-dom";
import FormMovement from "../Components/FormMovemet"
import Modal from 'react-bootstrap/Modal';
import ButtonWithLoading from '../Components/ButtonWithLoading'

function CreateMovement(){

    const {op} = useParams()
    
    const { register, handleSubmit, getValues, setValue, formState:{errors}} = useForm()
    const [operation,setOperation] = useState(true) //operation od ingress or egress

    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (data) => {
        if(data.categoryId === "0"){
            data.categoryId = null
        }

        const create = async()=>{
            data.isEgress = operation
            //console.log("data", data)
            const request = await postMovement(data)
            if (request){
                //console.log("ALTA SATISFACTORIA: ", request)
                setValue("date",Moment().format('YYYY-MM-DD'))
                setValue("concept","")
                setValue("amount","")
                setValue("categoryId",0)
                setModalShow(false)
            }
        }
        //console.log("FORM ", data)
        create()
    }

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
                    Guardado de Nuevo Movimiento
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>
                    ¿Seguro/a que desea guardar el movimiento "{String(getValues("concept")).toUpperCase()}" como {operation && <>EGRESO</>}{!operation && <>INGRESO</>} por un monto de {getValues("amount")}?
                </p>
                </Modal.Body>
                <Modal.Footer>
                <ButtonWithLoading variant="secondary" onClick={props.onHide}>Cerrar</ButtonWithLoading>
                <ButtonWithLoading variant="danger" onClick={handleSubmit(onSubmit)}>GUARDAR</ButtonWithLoading>
                </Modal.Footer>
            </Modal>
        );
    }

    useEffect(
        ()=>{
            const ff = Moment().format('YYYY-MM-DD')
            setValue("date",ff)
            //console.log("DATE: ", ff)

            if(op === "false"){
                setOperation(false)
            }else if(op === "true"){
                setOperation(true)
            }
        },
        [setValue,op]
    )

    const handleChange = ()=>{
        setOperation(!operation)
        //console.log(operation)
    }

    return( 
            <>
                <FormMovement 
                    submit={() => setModalShow(true)}
                    typeButton = 'button'
                    error = {errors} 
                    changeCheckBox={handleChange} 
                    checkedCheckBox={operation} 
                    dateRegister={{...register("date",{required:true})}} 
                    conceptRegister={{...register("concept",{required:true})}} 
                    amountRegister={{...register("amount",{required:true,min:0})}} 
                    categoryRegister={{...register("categoryId")}} 
                    isEgressRegister={{...register("isEgress")}} 
                />

                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </>
        )

    
}

export default CreateMovement


