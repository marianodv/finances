import React, {useEffect,useState} from "react";
import {deleteById, getAll} from "../Services/categoriesService"
import {useNavigate} from 'react-router-dom'
import Loading from "../Components/Loading";
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"

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
                <ButtonWithoutLoading variant="create" onClick={()=>{navi('/categories/new')}}>NUEVA CATEGORIA</ButtonWithoutLoading>
            </div>
            <Loading loading={loading}>
                    <div>
                        {categories.map((category) => <p key={category._id}>{category._id} | {category.name}
                            <ButtonWithoutLoading variant="edit" onClick={()=>{handleEditar(category._id)}}>EDITAR</ButtonWithoutLoading>
                            <ButtonWithoutLoading variant="delete" onClick={()=>{handleEliminar(category._id)}}>ELIMINAR</ButtonWithoutLoading>
                        </p>)}
                    </div>
            </Loading>
        </div>
    )
    
}

export default Categories


