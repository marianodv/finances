import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form"
import {postMovement} from "../Services/createMovementService"
import Moment from 'moment';
import { useParams } from "react-router-dom";
import FormMovement from "../Components/FormMovemet"


const styles = {
    egress:{
        backgroundColor:'red'
    },
    ingress:{
        backgroundColor:'green'
    }
}


function CreateMovement(props){

    const {op} = useParams()
    
    const { register, handleSubmit, setValue,formState:{errors}} = useForm()
    const [operation,setOperation] = useState(true)

    

    const onSubmit = (data) => {
    if(data.categoryId === "0"){
        data.categoryId = null
    }

    const create = async()=>{
        data.isEgress = operation
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

            if(op === "false"){
                setOperation(false)
            }else if(op === "true"){
                setOperation(true)
            }
        },
        [setValue,op]
    )

    const handleChange = ()=>{
        setOperation(!operation)
        console.log(operation)
    }

    /*
    return( 
        <div style={(operation && styles.egress) || (!operation && styles.ingress)}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="Fecha" type="date" register={{...register("date",{required:true})}}/>
                {errors.name && <span>El campo nombre es obligatorio.</span>}
            
                <Input label="Concepto" register={{...register("concept",{required:true})}}/>
                {errors.concept && <span>El campo concepto es obligatorio.</span>}

                <Input label="Monto" type="number" register={{...register("amount",{required:true,min:0})}}/>
                {errors.amount?.type === 'required' && <span>El campo monto es obligatorio.</span>}
                {errors.amount?.type === 'min' && <span>El monto no puede ser negativo.</span>}

                <CategoriesList label="Categoria: " register={{...register("categoryId")}}/>

                <div>
                    <label>Es Egreso: </label>
                    <input type="checkbox" onChange={handleChange} checked={operation} register={{...register("isEgress")}}/>
                </div>
                
                <button type="submit">AGREGAR</button>
            </form>
        </div>
    )*/

    return( 
        <div style={(operation && styles.egress) || (!operation && styles.ingress)}>
            <FormMovement submit={handleSubmit(onSubmit)} error = {errors} changeCheckBox={handleChange} checkedCheckBox={operation} dateRegister={{...register("date",{required:true})}} conceptRegister={{...register("concept",{required:true})}} amountRegister={{...register("amount",{required:true,min:0})}} categoryRegister={{...register("categoryId")}} isEgressRegister={{...register("isEgress")}} />
        </div>
    )

    
}

export default CreateMovement


