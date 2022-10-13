import React, {useState} from "react";
import {newCategory} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import FormCategory from '../Components/FormCategory'
import Modal from 'react-bootstrap/Modal';
import ButtonWithLoading from '../Components/ButtonWithLoading'

function CreateCategory(){

    const [viewMessaje,setViewMessaje] = useState(false)

    const [modalShow, setModalShow] = useState(false);

    const [newCat, setNewCat] = useState({})
    
    const { register, handleSubmit, setValue, getValues, formState:{errors}} = useForm()

    const onSubmit = (data) => {
        setNewCat(data)
        setModalShow(true)
        
        //console.log("newCat ", newCat)
        //console.log("err",errors.name)
    }

    const onCreate = async () =>{
        try{
            const request = await newCategory(newCat)
            if (request.data){
                //console.log("ALTA SATISFACTORIA: ", request)
                setValue('name',"")
                setModalShow(false)
                setViewMessaje(true)
                setTimeout(()=>{
                    setViewMessaje(false)
                },1300)
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
                        ¿Seguro/a que desea guardar la categoria "{String(getValues("name")).toUpperCase()}"?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonWithLoading variant="secondary" onClick={props.onHide}>Cerrar</ButtonWithLoading>
                    <ButtonWithLoading variant="danger" onClick={()=>{onCreate()}}>GUARDAR</ButtonWithLoading>
                </Modal.Footer>
            </Modal>
        )
    }


    return(
        <>
               
            <FormCategory submit={handleSubmit(onSubmit)} nameRegister={{...register("name",{required:true,minLength:3,maxLength:25})}} errors={errors} />         
            
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />  
            {viewMessaje &&
                <p>Alta satisfactoria.</p>
            }
        </>
    )
}

export default CreateCategory


