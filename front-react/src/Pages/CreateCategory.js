import React, {useState} from "react";
import {newCategory} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import {useNavigate} from 'react-router-dom'
import FormCategory from '../Components/FormCategory'


function CreateCategory(){

    const [viewMessaje,setViewMessaje] = useState(false)

    const { register, handleSubmit, formState:{errors}} = useForm()

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
                    },2000)
                }
            }catch (error){
                console.log("Error: ", error)
            }
        }
       
        //console.log("FORM ", data)
        newCat()
    }


    return(
        <>
            {!viewMessaje &&
                <div>
                    <FormCategory submit={handleSubmit(onSubmit)} idName="name" nameRegister={{...register("name",{required:true})}} error={errors} />
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


