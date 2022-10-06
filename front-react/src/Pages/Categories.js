import React, {useEffect,useState} from "react";
import {getAll} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import Input from "../Components/Input"

function Categories(){

    const [loading,setLoading] = useState(true)
    const [newCategory,setNewCategory] = useState(false)
    const [categories,setCategories] = useState([])

    const { register, handleSubmit, formState:{errors}} = useForm()


    const onSubmit = (data) => {
        const update = async()=>{
            //const request = await updateById(id, data)
            //if (request){
            //    console.log("MODIFICACION SATISFACTORIA: ", request)
            //}
        }
       
        console.log("FORM ", data)
        update()
    }


    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getAll()
                    console.log("LST: ",response?.data)
                    if(response.data){
                        setCategories(response?.data)
                        setLoading(false)
                    }
                }catch (error){
                    console.log("Error: ", error)
                }
            }
            request()
        },
        []
    )

    const handleEditar = (id)=>{
        console.log("EDITAR",id)
    }

    const handleEliminar =(id)=>{
        console.log("ELIMINA", id)
    }

    if(loading){
        return(
            <>
                loading....
            </>
        )
    }else{
        return(
            <div>
                <div>
                    <button onClick={()=>{setNewCategory(true)}}>NUEVA CATEGORIA</button>
                </div>
                {newCategory &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Nombre" register={{...register("name",{required:true})}}/>
                        {errors.name && <span>El campo nombre es obligatorio.</span>}
                        <div>
                            <button type="submit">GUARDAR</button>
                            <button type="buttom" onClick={()=>{setNewCategory(false)}}>CANCELAR</button>
                        </div>
                    </form>
                }
                {!newCategory &&
                    <div>
                        {categories.map((category) => <p key={category._id}>{category._id} | {category.name}<button onClick={()=>{handleEditar(category._id)}}>EDITAR</button><button onClick={()=>{handleEliminar(category._id)}}>ELIMINAR</button></p>)}
                    </div>
                }
            </div>
        )
    }
    
}

export default Categories


