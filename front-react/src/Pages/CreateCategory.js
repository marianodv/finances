import React, {useState} from "react";
import {newCategory} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import Input from "../Components/Input"
import {useNavigate} from 'react-router-dom'


function Categories(){

    const [viewMessaje,setViewMessaje] = useState(false)

    const { register, handleSubmit, formState:{errors}} = useForm()

    const navi = useNavigate()

    const onSubmit = (data) => {
        const updateOrNew = async()=>{
            try{
                const request = await newCategory(data)
                if (request){
                    console.log("ALTA SATISFACTORIA: ", request)
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
        updateOrNew()
    }


   
    return(
        <>
            {!viewMessaje &&
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Nombre" register={{...register("name",{required:true})}}/>
                        {errors.name && <span>El campo nombre es obligatorio.</span>}
                        <div>
                            <button type="submit">GUARDAR</button>
                            <button type="buttom" onClick={()=>{navi('/categories/')}}>CANCELAR</button>
                        </div>
                    </form>
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

export default Categories


