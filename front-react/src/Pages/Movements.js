import React, {useEffect,useState} from "react";
import Movement from "../Components/Movement";
import {getAll,deleteById, getIncomes, getExpenses, getByCategory} from "../Services/movementsServices"
import CategoriesList from "../Components/CategoriesList"
import {useForm} from "react-hook-form"

function Movements(){

    const [loading,setLoading] = useState(true)
    const [movements,setMovements] = useState([])

    const { register,setValue, getValues} = useForm()

    useEffect(
        ()=>{
            listAll()
        },
        []
    )

    const listAll = async () =>{
        try{          
            setValue("category",0)
            const response = await getAll()
            console.log("LST: ",response?.data)
            setMovements(response?.data)

            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listForCategory = async () =>{
        try{          
            const response = await getByCategory(getValues("category"))
            console.log("LST: ",response?.data)
            setMovements(response?.data)

            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listIngress = async () =>{
        try{    
            setValue("category",0)      
            const response = await getIncomes()
            console.log("LST: ",response?.data)
            setMovements(response?.data)

            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listEgress = async () =>{
        try{      
            setValue("category",0)    
            const response = await getExpenses()
            console.log("LST: ",response?.data)
            setMovements(response?.data)

            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const handleDelete = async (id)=>{
        console.log("EEEEE", id)
        try{          
            const response = await deleteById(id)
            console.log("DELETE: ",response?.data)
            if (response.data){
                setLoading(true)
            }
        }catch (error){
            console.log("Error: ", error)
        }
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
                <div>
                    <CategoriesList label="Categorias: " register={{...register("category")}}/>
                    <button onClick={()=>{
                        setLoading(true)
                        listForCategory()
                    }}>Por Categoria</button>

                    <button onClick={()=>{
                        setLoading(true)
                        listAll()
                    }}>TODO</button>

                    <button onClick={()=>{
                        setLoading(true)
                        listIngress()
                    }}>Solo Ingresos</button>

                    <button onClick={()=>{
                        setLoading(true)
                        listEgress()
                    }}>Solo Egresos</button>
                </div>
                <div>
                    {movements?.rows.map((movement,ind) => <Movement key={ind} data={movement} onDelete={()=>{handleDelete(movement._id)}}>{ind+1}</Movement>)}  
                    <p>{movements?.pageMin} to page {movements?.page} to {movements?.pageMax} | TOTAL: {movements?.rowsCount} | listed: {movements?.rowsPerPage}</p>
                </div>
            </>
        )
    }
    
}

export default Movements


