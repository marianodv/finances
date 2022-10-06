import React, {useEffect,useState} from "react";
import {useForm} from "react-hook-form"
import Input from "../Components/Input"
import {getById,deleteById,updateById} from "../Services/movementsServices"
import { useParams } from "react-router-dom";
import Moment from 'moment';
import Categories from "../Components/Categories";
import {useNavigate} from 'react-router-dom'

function EditMovement(){

    const {id} = useParams()

    const navi = useNavigate()
    
    const [loading,setLoading] = useState(true)

    const [deleted,setDeleted] = useState(false)

    const { register, handleSubmit, setValue,getValues, formState:{errors}} = useForm()

    const [operation,setOperation] = useState(false)

    const onSubmit = (data) => {
        if(data.categoryId === "0"){
            data.categoryId = null
        }

        const update = async()=>{
            const request = await updateById(id, data)
            if (request){
                console.log("MODIFICACION SATISFACTORIA: ", request)
            }
        }
       
        console.log("FORM ", data)
        update()
    }

    useEffect(
        ()=>{
            const init = async()=>{
                const request = await getById(id)
                console.log("init: ", request)
                if (request.data){
                    setValue("date",Moment(request.data.date).format('YYYY-MM-DD'))
                    setValue("concept",request.data.concept)
                    setValue("amount",request.data.amount)
                    setValue("categoryId", request.data.categoryId)
                    if (request.data.isEgress === "true"){
                        setOperation(true)
                    }else{
                        setOperation(false)
                    }
                    setLoading(false)
                }
            }
            init()
        },
        [id,setValue]
    )

    const handleEliminar = async () =>{
        const deletedMovement = await deleteById(id)
        console.log("DELETED",id,deletedMovement)
        
        setValue("date","")
        setValue("concept","")
        setValue("amount","")
        setValue("categoryId", "")
        setValue("isEgress", "false")
        
        setDeleted(true)

        setTimeout(()=>{
            navi("/")
        },2000)
    }

    const handleChange = ()=>{
        setOperation(!operation)
        console.log(operation)
        console.log("GET:", getValues())
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
                <div hidden = {deleted}>
                    <div>
                        <h2>Edicion de Id: {id}</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Fecha" type="date" register={{...register("date",{required:true})}}/>
                        {errors.name && <span>El campo nombre es obligatorio.</span>}
                    
                        <Input label="Concepto" register={{...register("concept",{required:true})}}/>
                        {errors.concept && <span>El campo concepto es obligatorio.</span>}

                        <Input label="Monto" type="number" register={{...register("amount",{required:true,min:0})}}/>
                        {errors.amount?.type === 'required' && <span>El campo monto es obligatorio.</span>}
                        {errors.amount?.type === 'min' && <span>El monto no puede ser negativo.</span>}

                        <Categories label="Categoria: " register={{...register("categoryId")}}/>

                        <div>
                            <label>Es Egreso: </label>
                            <input type="checkbox" onChange={handleChange} checked={operation} register={{...register("isEgress")}}/>
                        </div>
                         
                        <button type="submit">GUARDAR</button>
                        <button type="buttom" onClick={()=>{handleEliminar()}}>ELIMINAR</button>
                        <button type="buttom" onClick={()=>{navi("/movements/")}}>CANCELAR</button>
                    </form>
                </div>
                <div hidden = {!deleted}>
                    <h1>Movimiento {id} eliminado. Redirigiendo...</h1>
                </div>
            </>
        )
    }
    
}

export default EditMovement


