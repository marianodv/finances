import React from "react";
import {useForm} from "react-hook-form"

function CreateMovement(){

    const { register, handleSubmit, formState:{errors}} = useForm()

     const onSubmit = (data) => {
        console.log("FORM ", data)
     }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Fecha</label>
                    <input type="text" {...register("name",{required:true})}/>
                    {errors.name && <span>El campo nombre es obligatorio.</span>}
                </div>
                <div>
                    <label>Concepto</label>
                    <input type="text" {...register("concept",{required:true})}/>
                    {errors.concept && <span>El campo concepto es obligatorio.</span>}
                </div>
                <div>
                    <label>Monto</label>
                    <input type="number" {...register("amount",{required:true,min:0})}/>
                    {errors.amount?.type === 'required' && <span>El campo monto es obligatorio.</span>}
                    {errors.amount?.type === 'min' && <span>El monto no puede ser negativo.</span>}
                </div>
                <div>
                    <label>Es Egreso: </label>
                    <input type="checkbox" {...register("isEgress",{value:true})} />
                </div>
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    )

    
}

export default CreateMovement


