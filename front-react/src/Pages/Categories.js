import React, {useEffect,useState} from "react";
import {getAll, newCategory} from "../Services/categoriesService"
import {useForm} from "react-hook-form"
import Input from "../Components/Input"

function Categories(){

    const [loading,setLoading] = useState(true)
    const [visible,setVisible] = useState(false)
    const [categories,setCategories] = useState([])

    const { register, handleSubmit, formState:{errors}} = useForm()


    const onSubmit = (data) => {
        const update = async()=>{
            try{
                const request = await newCategory(data)
                if (request){
                    console.log("ALTA SATISFACTORIA: ", request)
                }
                const response = await getAll()
                console.log("LST: ",response?.data)
                if(response.data){
                    setCategories(response?.data)
                    setVisible(false)
                }
            }catch (error){
                console.log("Error: ", error)
            }
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
                    <button onClick={()=>{setVisible(true)}}>NUEVA CATEGORIA</button>
                </div>
                {visible &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Nombre" register={{...register("name",{required:true})}}/>
                        {errors.name && <span>El campo nombre es obligatorio.</span>}
                        <div>
                            <button type="submit">GUARDAR</button>
                            <button type="buttom" onClick={()=>{setVisible(false)}}>CANCELAR</button>
                        </div>
                    </form>
                }
                {!visible &&
                    <div>
                        {categories.map((category) => <p key={category._id}>{category._id} | {category.name}<button onClick={()=>{handleEditar(category._id)}}>EDITAR</button><button onClick={()=>{handleEliminar(category._id)}}>ELIMINAR</button></p>)}
                    </div>
                }
            </div>
        )
    }
    
}

export default Categories


