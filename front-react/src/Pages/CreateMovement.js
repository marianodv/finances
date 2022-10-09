import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form"
import {postMovement} from "../Services/movementsServices"
import Moment from 'moment';
import { useParams } from "react-router-dom";
import FormMovement from "../Components/FormMovemet"


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
            //console.log("ALTA SATISFACTORIA: ", request)
            setValue("date",Moment().format('YYYY-MM-DD'))
            setValue("concept","")
            setValue("amount","")
        }
    }
    
    //console.log("FORM ", data)
    create()
    }

    useEffect(
        ()=>{
            const ff = Moment().format('YYYY-MM-DD')
            setValue("date",ff)
            //console.log("DATE: ", ff)

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

    return( 
            <FormMovement submit={handleSubmit(onSubmit)} error = {errors} changeCheckBox={handleChange} checkedCheckBox={operation} dateRegister={{...register("date",{required:true})}} conceptRegister={{...register("concept",{required:true})}} amountRegister={{...register("amount",{required:true,min:0})}} categoryRegister={{...register("categoryId")}} isEgressRegister={{...register("isEgress")}} />
        )

    
}

export default CreateMovement


