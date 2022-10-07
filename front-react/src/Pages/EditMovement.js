import React, {useEffect,useState} from "react";
import {useForm} from "react-hook-form"
import Input from "../Components/Input"
import {getById,deleteById,updateById} from "../Services/movementsServices"
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import moment from "moment";
import FormMovement from "../Components/FormMovemet"

const styles = {
    egress:{
        backgroundColor:'red'
    },
    ingress:{
        backgroundColor:'green'
    }
}


function EditMovement(){

    const {id} = useParams()

    const navi = useNavigate()
    
    const [loading,setLoading] = useState(true)

    const [viewForm,setViewForm] = useState(false) //para ocultar div antes de redireccion

    const [isEgress,setIsEgress] = useState(true) //true = es egreso | false = es ingreso

    const { register, handleSubmit, setValue, formState:{errors}} = useForm()

    

    const onSubmit = (data) => {
        if(data.categoryId === "0"){
            data.categoryId = null
        }
        console.log("DATA: ", data)
        const update = async()=>{
            data.date = moment(data.date).format('YYYY-MM-DD')
            const request = await updateById(id, data)
            if (request){
                console.log("MODIFICACION SATISFACTORIA: ", request)
                setViewForm(true)
                setTimeout(()=>{
                    navi("/movements/")
                },2000)
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
                    setValue("date",moment(request.data.date).format('YYYY-MM-DD'))
                    setValue("concept",request.data.concept)
                    setValue("amount",request.data.amount)
                    setValue("categoryId", request.data.categoryId)
                    if (request.data.isEgress === "true" || request.data.isEgress === true){
                        setIsEgress(true)
                    }else{
                        setIsEgress(false)
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
      
        if (deletedMovement.data){
            setViewForm(true)

            setTimeout(()=>{
                navi("/movements/")
            },2000)
        }

       
    }

    if(loading){
        return(
            <>
                loading....
            </>
        )
    }else{
        /*return(
            <>
                <div hidden = {viewForm} style={(isEgress && styles.egress) || (!isEgress && styles.ingress)}>
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

                        <CategoriesList label="Categoria: " register={{...register("categoryId")}}/>

                        <label hidden={!isEgress}>Es Egreso</label>
                        <label hidden={isEgress}>Es Ingreso</label>
                         
                        <div>
                            <button type="submit">GUARDAR</button>
                            <button type="buttom" onClick={()=>{handleEliminar()}}>ELIMINAR</button>
                        <button type="buttom" onClick={()=>{navi("/movements/")}}>CANCELAR</button>
                        </div>
                    </form>
                </div>
                <div hidden = {!viewForm}>
                    <h1>Movimiento {id} modificado o eliminado. Redirigiendo...</h1>
                </div>
            </>
        )*/
        return(
            <>
                <div hidden = {viewForm} style={(isEgress && styles.egress) || (!isEgress && styles.ingress)}>
                    <div>
                        <h2>Edicion de Id: {id}</h2>
                    </div>
                    <FormMovement submit={handleSubmit(onSubmit)} error = {errors} checkedCheckBox={isEgress} dateRegister={{...register("date",{required:true})}} conceptRegister={{...register("concept",{required:true})}} amountRegister={{...register("amount",{required:true,min:0})}} categoryRegister={{...register("categoryId")}} >
                        <button type="buttom" onClick={()=>{handleEliminar()}}>ELIMINAR</button>
                    </FormMovement>
                        
                </div>
                <div hidden = {!viewForm}>
                    <h1>Movimiento {id} modificado o eliminado. Redirigiendo...</h1>
                </div>
            </>
        )
    }
    
}

export default EditMovement


