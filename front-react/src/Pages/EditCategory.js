import React, {useEffect, useState} from "react";
import {getById, deleteById, updateById} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import {useNavigate, useParams} from 'react-router-dom'
import FormCategory from '../Components/FormCategory'
import Loading from '../Components/Loading'
import ButtonWithLoading from '../Components/ButtonWithLoading'
import Modal from 'react-bootstrap/Modal'


function EditCategory(){

    const {id} = useParams()

    const [loading,setLoading] = useState(true)

    const [viewMessaje,setViewMessaje] = useState(false)

    const [modalShow, setModalShow] = React.useState(false);

    const { register, handleSubmit, setValue, formState:{errors}} = useForm()

    const navi = useNavigate()

    const onSubmit = (data) => {
        const updateCat = async()=>{
            try{
                const request = await updateById(id, data)
                if (request){
                    console.log("MODIFICACION SATISFACTORIA: ", request)
                    setViewMessaje(true)
                    setTimeout(()=>{
                        navi('/categories/')
                    },2000)
                }
            }catch (error){
                console.log("Error: ", error)
            }
        }
       
        console.log("FORM ", data)
        updateCat()
    }

    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getById(id)
                    console.log("LST: ",response?.data)
                    if(response.data){
                        setValue("name",response.data.name)
                        setLoading(false)
                    }
                }catch (error){
                    console.log("Error: ", error)
                }
            }
            request()
        },
        [id, setValue]
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
                Eliminacion de Categoria id: {id}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
                ¿Seguro/a que desea eliminar la categoria?
            </p>
            </Modal.Body>
            <Modal.Footer>
            <ButtonWithLoading variant="secondary" onClick={props.onHide}>Cerrar</ButtonWithLoading>
            <ButtonWithLoading variant="danger" onClick={clickOnModalDelete}>ELIMINAR</ButtonWithLoading>
            </Modal.Footer>
        </Modal>
        );
    }


    const handleEliminar =()=>{
        setModalShow(true)
    }
   
    const clickOnModalDelete = async ()=>{
        setModalShow(false)
        const request = async()=>{ 
            try{          
                const response = await deleteById(id)
                console.log("DELETE: ",response?.data)
                if(response.data){
                    setViewMessaje(true)
                    setTimeout(()=>{
                        navi('/categories/')
                    },2000)
                }
            }catch (error){
                console.log("Error: ", error)
            }
        }
        request()
    }
    
    return(
        <Loading loading={loading}>
            {!viewMessaje &&
                <>
                    <div>
                        <h2>Edicion de Categoria id: {id}</h2>
                    </div>
                    <FormCategory submit={handleSubmit(onSubmit)} nameRegister={{...register("name",{required:true})}} error={errors} >
                        <ButtonWithLoading type="button" variant="danger" onClick={handleEliminar}>ELIMINAR</ButtonWithLoading>
                    </FormCategory>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    /> 
                </>
            }
            {viewMessaje &&
                <div>
                    Edicion o Eliminacion Satisfactoria. Redireccionando...
                </div>
            }
        </Loading>
    )
   
    
}

export default EditCategory


