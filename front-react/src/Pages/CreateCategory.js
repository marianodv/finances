import React, {useState} from "react";
import {newCategory} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import {useNavigate} from 'react-router-dom'
import FormCategory from '../Components/FormCategory'
import Modal from 'react-bootstrap/Modal';
import ButtonWithLoading from '../Components/ButtonWithLoading'

function CreateCategory(){

    const [viewMessaje,setViewMessaje] = useState(false)

    const [modalShow, setModalShow] = useState(false);

    const { register, handleSubmit, getValues, formState:{errors}} = useForm()

    const navi = useNavigate()

    const onSubmit = (data) => {
        const newCat = async()=>{
            try{
                const request = await newCategory(data)
                if (request){
                    //console.log("ALTA SATISFACTORIA: ", request)
                    setViewMessaje(true)
                    setTimeout(()=>{
                        navi('/categories/')
                    },1300)
                }
            }catch (error){
                console.log("Error: ", error)
            }
        }
       
        //console.log("FORM ", data)
        newCat()
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
                    ¿Seguro/a que desea guardar la categoria "{String(getValues("name")).toUpperCase()}"?
                </p>
                </Modal.Body>
                <Modal.Footer>
                <ButtonWithLoading variant="secondary" onClick={props.onHide}>Cerrar</ButtonWithLoading>
                <ButtonWithLoading variant="danger" onClick={handleSubmit(onSubmit)}>GUARDAR</ButtonWithLoading>
                </Modal.Footer>
            </Modal>
        );
    }

    return(
        <>
            {!viewMessaje &&
                <div>
                    <FormCategory submit={() => setModalShow(true)} typeButton = 'button' idName="name" nameRegister={{...register("name",{required:true})}} error={errors} />

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
            }
            {viewMessaje &&
                <div>
                    Alta satisfactoria. Redireccionando...
                </div>
            }
        </>
    )
}

export default CreateCategory


