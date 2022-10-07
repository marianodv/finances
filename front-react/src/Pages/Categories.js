import React, {useEffect,useState} from "react";
import {deleteById, getAll} from "../Services/categoriesService"
import {useNavigate} from 'react-router-dom'
import Loading from "../Components/Loading";

function Categories(){

    const [loading,setLoading] = useState(true)
    const [categories,setCategories] = useState([])
    
    const navi = useNavigate()


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
        navi('/categories/edit/' + id)
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


    
   
    return(
        <div>
            <div>
                <button onClick={()=>{navi('/categories/new')}}>NUEVA CATEGORIA</button>
            </div>
            <Loading loading={loading}>
                    <div>
                        {categories.map((category) => <p key={category._id}>{category._id} | {category.name}<button onClick={()=>{handleEditar(category._id)}}>EDITAR</button><button onClick={()=>{handleEliminar(category._id)}}>ELIMINAR</button></p>)}
                    </div>
            </Loading>
        </div>
    )
    
}

export default Categories


