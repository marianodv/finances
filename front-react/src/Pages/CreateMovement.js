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
                    <input type="text" {...register("name")}/>
                </div>
                <div>
                    <label>Concepto</label>
                    <input type="text" {...register("concept")}/>
                </div>
                <div>
                    <label>Monto</label>
                    <input type="number" {...register("amount")}/>
                </div>
                <div>
                    <input type="checkbox" {...register("isEgress")} value="Es Egreso?" />
                </div>
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    )

    
}

export default CreateMovement


