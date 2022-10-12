import React, {useEffect,useState} from "react";
import {useForm} from "react-hook-form"
import {getById,deleteById,updateById} from "../Services/movementsServices"
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import moment from "moment";
import FormMovement from "../Components/FormMovemet"
import Loading from "../Components/Loading"
import ButtonWithLoading from '../Components/ButtonWithLoading'
import Modal from 'react-bootstrap/Modal';
import toCapitalize from '../utils/toCapitalize'


function EditMovement(){

    const {id} = useParams()

    const navi = useNavigate()
    
    const [loading,setLoading] = useState(true)

    const [viewForm,setViewForm] = useState(false) //para ocultar div antes de redireccion

    const [isEgress,setIsEgress] = useState(true) //true = es egreso | false = es ingreso

    const [modalShow, setModalShow] = React.useState(false);

    const { register, handleSubmit, setValue, formState:{errors}} = useForm()

    

    const onSubmit = (data) => {
        if(data.categoryId === "0"){
            data.categoryId = null
        }
        //console.log("DATA: ", data)
        const update = async()=>{
            data.date = moment(data.date).format('YYYY-MM-DD')
            const request = await updateById(id, data)
            if (request){
                //console.log("MODIFICACION SATISFACTORIA: ", request)
                setViewForm(true)
                setTimeout(()=>{
                    navi("/movements/")
                },2000)
            }
        }
       
        //console.log("FORM ", data)
        update()
    }

    useEffect(
        ()=>{
            const init = async()=>{
                const request = await getById(id)
                //console.log("init: ", request)
                if (request.data){
                    setValue("date",moment(request.data.date).format('YYYY-MM-DD'))
                    setValue("concept",toCapitalize(request.data.concept))
                    setValue("amount",request.data.amount)
                    setValue("categoryId", request.data.categoryId)
                    if (request.data.isEgress === "true" || request.data.isEgress === true){
                        setIsEgress(true)
                    }else{
                        setIsEgress(false)
                    }
                    setLoading(false)
                }
            }
            init()
        },
        [id,setValue]
    )

    const handleEliminar = () =>{
        setModalShow(true)
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
                Eliminacion de Movimiento id: {id}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
                ¿Seguro/a que desea eliminar el movimiento?
            </p>
            </Modal.Body>
            <Modal.Footer>
            <ButtonWithLoading variant="secondary" onClick={props.onHide}>Cerrar</ButtonWithLoading>
            <ButtonWithLoading variant="danger" onClick={clickOnModalDelete}>ELIMINAR</ButtonWithLoading>
            </Modal.Footer>
        </Modal>
        );
    }


    const clickOnModalDelete = async ()=>{
        setModalShow(false)
        const deletedMovement = await deleteById(id)
        //console.log("DELETED",id,deletedMovement)
        
        if (deletedMovement.data){
            setViewForm(true)

            setTimeout(()=>{
                navi("/movements/")
            },1300)
        }
    }

  
    return(
        <Loading loading={loading}>
            <div hidden = {viewForm}>
                <div>
                    <h2>Edicion de Movimiento Id: {id}</h2>
                </div>
                <FormMovement submit={handleSubmit(onSubmit)} error = {errors} checkedCheckBox={isEgress} dateRegister={{...register("date",{required:true})}} conceptRegister={{...register("concept",{required:true})}} amountRegister={{...register("amount",{required:true,min:0})}} categoryRegister={{...register("categoryId")}} >
                    <ButtonWithLoading type="button" variant="danger" onClick={()=>{handleEliminar()}}>ELIMINAR</ButtonWithLoading>
                </FormMovement>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <div hidden = {!viewForm}>
                <h1>Movimiento {id} modificado o eliminado. Redirigiendo...</h1>
            </div>
        </Loading>
    )
    
    
}

export default EditMovement


