import React, {useEffect,useState} from "react";
import Movement from "../Components/Movement";
import {getAll} from "../Services/categoriesServices"

function Categories(){

    const [loading,setLoading] = useState(true)
    const [newCategory,setNewCategory] = useState(false)

    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getAll()
                    console.log("LST: ",response?.data)
                    setMovements(response?.data)

                    setLoading(false)
                }catch (error){
                    console.log("Error: ", error)
                }
            }
            request()
        },
        []
    )

    if(loading){
        return(
            <>
                loading....
            </>
        )
    }else{
        return(
            <div>
                {newCategory &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Nombre" register={{...register("name",{required:true})}}/>
                        {errors.concept && <span>El campo nombre es obligatorio.</span>}

                        <div>
                            <label>Es Egreso: </label>
                            <input type="checkbox" onChange={handleChange} checked={operation} register={{...register("isEgress")}}/>
                        </div>
                         
                        <button type="submit">GUARDAR</button>
                        <button type="buttom" onClick={()=>{setNewCategory(false)}}>ELIMINAR</button>
                    </form>
                }
                {!newCategory &&
                    <div>
                        CATEGORIAS....
                    </div>
                }
            </div>
        )
    }
    
}

export default Categories


