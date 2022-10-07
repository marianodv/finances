import React, {useEffect, useState} from "react";
import {getById, deleteById, updateById} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import {useNavigate, useParams} from 'react-router-dom'
import FormCategory from '../Components/FormCategory'
import Loading from '../Components/Loading'


function EditCategory(){

    const {id} = useParams()

    const [loading,setLoading] = useState(true)

    const [viewMessaje,setViewMessaje] = useState(false)

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

    const handleEliminar =()=>{
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
                    <h2>Edicion de Categoria id: {id}</h2>
                    <div>
                        <FormCategory submit={handleSubmit(onSubmit)} nameRegister={{...register("name",{required:true})}} error={errors} >
                            <button type="button" onClick={handleEliminar}>ELIMINAR</button>
                            <button type="button" onClick={()=>{navi('/categories/')}}>CANCELAR</button>
                        </FormCategory>
                    </div>
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


