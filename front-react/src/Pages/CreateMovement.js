import React from "react";
import {useForm} from "react-hook-form"
import Input from "../Components/Input"

function CreateMovement(){

    const { register, handleSubmit, formState:{errors}} = useForm()

     const onSubmit = (data) => {
        console.log("FORM ", data)
     }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="Fecha" register={{...register("name",{required:true})}}/>
                {errors.name && <span>El campo nombre es obligatorio.</span>}
            
                <Input label="Concepto" register={{...register("concept",{required:true})}}/>
                {errors.concept && <span>El campo concepto es obligatorio.</span>}

                <Input label="Monto" type="number" register={{...register("amount",{required:true,min:0})}}/>
                {errors.amount?.type === 'required' && <span>El campo monto es obligatorio.</span>}
                {errors.amount?.type === 'min' && <span>El monto no puede ser negativo.</span>}

                <Input label="Es Egreso:" type="checkbox" register={{...register("isEgress",{value:true})}}/>
                
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    )

    
}

export default CreateMovement


