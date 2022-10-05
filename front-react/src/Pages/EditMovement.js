import React, {useEffect} from "react";
import {useForm} from "react-hook-form"
import Input from "../Components/Input"
import {getById} from "../Services/MovementsService"
import { useParams } from "react-router-dom";
import Moment from 'moment';
import Categories from "../Components/Categories";

function EditMovement(){

    const {id} = useParams()
    
    const [loading,setLoading] = useState(true)

    const { register, handleSubmit, setValue, formState:{errors}} = useForm()

     const onSubmit = (data) => {
        
     }

     useEffect(
        ()=>{
            const init = async()=>{
                const request = await getById(id)
                console.log("init: ", request)
                if (request.data){
                    setValue("date",Moment().format('YYYY-MM-DD'))
                    setValue("concept","")
                    setValue("amount","")
                    setValue("categoryId", "0")
                    setLoading(false)
                }
            }
            init()
        },
        [setValue]
    )

    if(loading){
        return(
            <>
                loading....
            </>
        )
    }else{
        return(
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input label="Fecha" type="date" register={{...register("date",{required:true})}}/>
                    {errors.name && <span>El campo nombre es obligatorio.</span>}
                
                    <Input label="Concepto" register={{...register("concept",{required:true})}}/>
                    {errors.concept && <span>El campo concepto es obligatorio.</span>}

                    <Input label="Monto" type="number" register={{...register("amount",{required:true,min:0})}}/>
                    {errors.amount?.type === 'required' && <span>El campo monto es obligatorio.</span>}
                    {errors.amount?.type === 'min' && <span>El monto no puede ser negativo.</span>}

                    <Categories label="Categoria: " register={{...register("categoryId")}}/>

                    <Input label="Es Egreso:" type="checkbox" register={{...register("isEgress",{value:operation})}}/>
                    
                    <button type="submit">GUARDAR</button>
                </form>
            </div>
        )
    }
    
}

export default EditMovement


