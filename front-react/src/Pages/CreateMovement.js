import React, {useEffect} from "react";
import {useForm} from "react-hook-form"
import Input from "../Components/Input"
import {postMovement} from "../Services/createMovementService"
import Moment from 'moment';

function CreateMovement(props){

    const operation = props.operation || true
    
    const { register, handleSubmit, setValue, formState:{errors}} = useForm()

     const onSubmit = (data) => {
        const create = async()=>{
            const request = await postMovement(data)
            if (request){
                console.log("ALTA SATISFACTORIA: ", request)
                setValue("date",Moment().format('YYYY-MM-DD'))
                setValue("concept","")
                setValue("amount","")
            }
        }
        console.log("FORM ", data)
        create()
     }

     useEffect(
        ()=>{
            const ff = Moment().format('YYYY-MM-DD')
            setValue("date",ff)
            console.log("DATE: ", ff)
        },
        [setValue]
    )

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

                <Input label="Es Egreso:" type="checkbox" register={{...register("isEgress",{value:operation})}}/>
                
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    )

    
}

export default CreateMovement


