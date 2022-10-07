import React, {useState} from "react";
import {getById, updateById} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import Input from "../Components/Input"
import {useNavigate, useParams} from 'react-router-dom'


function EditCategory(){

    const {id} = useParams

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
        []
    )

    const handleEliminar =(id)=>{
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
   

    if(loading){
        return(
            <>
                loading....
            </>
        )
    }else{
        return(
            <>
                {!viewMessaje &&
                    <>
                        <h2>Edicion de Categoria id: {id}</h2>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input label="Nombre" register={{...register("name",{required:true})}}/>
                                {errors.name && <span>El campo nombre es obligatorio.</span>}
                                <div>
                                    <button type="submit">GUARDAR</button>
                                    <button type="buttom" onClick={()=>{handleEliminar()}}>ELIMINAR</button>
                                    <button type="buttom" onClick={()=>{navi('/categories/')}}>CANCELAR</button>
                                </div>
                            </form>
                        </div>
                    </>
                }
                {viewMessaje &&
                    <div>
                        Edicion o Eliminacion Satisfactoria. Redireccionando...
                    </div>
                }
            </>
        )
    }
    
}

export default EditCategory


