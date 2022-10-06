import React, {useEffect,useState} from "react";
import {updateById, deleteById, getAll, newCategory} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import Input from "../Components/Input"

function Categories(){

    const [loading,setLoading] = useState(true)
    const [visible,setVisible] = useState(false)
    const [categories,setCategories] = useState([])
    const [isEditing,setIsEditing] = useState(0)

    const { register, handleSubmit, setValue, formState:{errors}} = useForm()


    const onSubmit = (data) => {
        const updateOrNew = async()=>{
            try{
                if (isEditing > 0){
                    const request = await updateById(isEditing, data)
                    if (request){
                        console.log("MODIFICACION SATISFACTORIA: ", request)
                        const response = await getAll()
                        console.log("LST: ",response?.data)
                        if(response.data){
                            setCategories(response?.data)
                            setVisible(false)
                        }
                    }
                    setIsEditing(0)
                }else{
                    const request = await newCategory(data)
                    if (request){
                        console.log("ALTA SATISFACTORIA: ", request)
                        const response = await getAll()
                        console.log("LST: ",response?.data)
                        if(response.data){
                            setCategories(response?.data)
                            setVisible(false)
                        }
                    }
                }
            }catch (error){
                console.log("Error: ", error)
            }
        }
       
        console.log("FORM ", data)
        updateOrNew()
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

    const handleEditar = (id, name)=>{
        setVisible(true)
        setValue("name",name)
        setIsEditing(id)
    }

    const handleEliminar =(id)=>{
        const request = async()=>{ 
            try{          
                const response = await deleteById(id)
                console.log("DELETE: ",response?.data)
                if(response.data){
                    const response = await getAll()
                    console.log("LST: ",response?.data)
                    if(response.data){
                        setCategories(response?.data)
                    }
                }
            }catch (error){
                console.log("Error: ", error)
            }
        }
        request()
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
                    <button onClick={()=>{setVisible(true);setIsEditing(0)}}>NUEVA CATEGORIA</button>
                </div>
                {visible &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Nombre" register={{...register("name",{required:true})}}/>
                        {errors.name && <span>El campo nombre es obligatorio.</span>}
                        <div>
                            <button type="submit">GUARDAR</button>
                            <button type="buttom" onClick={()=>{setVisible(false);setIsEditing(0)}}>CANCELAR</button>
                        </div>
                    </form>
                }
                {!visible &&
                    <div>
                        {categories.map((category) => <p key={category._id}>{category._id} | {category.name}<button onClick={()=>{handleEditar(category._id,category.name)}}>EDITAR</button><button onClick={()=>{handleEliminar(category._id)}}>ELIMINAR</button></p>)}
                    </div>
                }
            </div>
        )
    }
    
}

export default Categories


