import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form"
import {postMovement} from "../Services/movementsServices"
import Moment from 'moment';
import FormMovement from "../Components/FormMovemet"
import Modal from 'react-bootstrap/Modal';
import ButtonWithLoading from '../Components/ButtonWithLoading'
import {useLocation} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

function CreateMovement(props){

    const query = new URLSearchParams(useLocation().search)

    const op = query.get('egress') || 'true'
    
    const { register, handleSubmit, getValues, setValue, formState:{errors}} = useForm()

    const [viewMessaje,setViewMessaje] = useState(false)

    const [newMov, setNewMov] = useState({})

    const [operation,setOperation] = useState(true) //operation od ingress or egress

    const [modalShow, setModalShow] = useState(false);

    const onSubmit = (data) => {
        if(data.categoryId === "0"){
            data.categoryId = null
        }
        data.isEgress = operation

        setNewMov(data)
        setModalShow(true)
    }

    const onCreate = async () =>{
        try{
            const request = await postMovement(newMov)
            //console.log("create", request)
            if (request){
                //console.log("ALTA SATISFACTORIA: ", request)
                setValue("date",Moment().format('YYYY-MM-DD'))
                setValue("concept","")
                setValue("amount","")
                setValue("categoryId",0)
                setModalShow(false)
                setViewMessaje(true)
                setNewMov({})
                setTimeout(()=>{setViewMessaje(false)},1300)
            }
        }catch (error){
            console.log("Error: ", error)
        }
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
                    ??Seguro/a que desea guardar un nuevo {operation && <>GASTO</>}{!operation && <>INGRESO</>} como "{String(getValues("concept")).toUpperCase()}" por un monto de {getValues("amount")}?
                </p>
                </Modal.Body>
                <Modal.Footer>
                <ButtonWithLoading variant="secondary" onClick={props.onHide}>Cerrar</ButtonWithLoading>
                <ButtonWithLoading variant="danger" onClick={()=>{onCreate()}}>GUARDAR</ButtonWithLoading>
                </Modal.Footer>
            </Modal>
        );
    }

    useEffect(
        ()=>{
            setValue("date",Moment().format('YYYY-MM-DD'))
            
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
                    submit={handleSubmit(onSubmit)}
                    typeButton = 'button'
                    errors = {errors} 
                    changeCheckBox={handleChange} 
                    checkedCheckBox={operation} 
                    dateRegister={{...register("date",{required:true})}} 
                    conceptRegister={{...register("concept",{required:true,minLength:5,maxLength:70})}} 
                    amountRegister={{...register("amount",{required:true,min:0})}} 
                    categoryRegister={{...register("categoryId")}} 
                    isEgressRegister={{...register("isEgress")}} 
                />
                {viewMessaje &&
                    <Alert variant="success">
                        Alta satisfactoria.
                    </Alert>
                }
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </>
        )

    
}

export default CreateMovement


