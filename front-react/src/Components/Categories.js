import React,{useEffect,useState} from "react";
import {getAll} from "../Services/categoriesService"

function Categories(){

    const [loading,setLoading] = useState(true)
    const [categories, setCategories] = useState[]

    useEffect(
        ()=>{
            const request = async () => {
                try{
                    const cat = await getAll()
                    console.log("cat: ", cat.data)
                    setCategories(cat.data)
                    setLoading(false)
                }catch (error){
                    console.log("Error: ", error)
                }
            }

            request()
        },
        []
    )

    return(
        <>
            { loading &&
                <div>
                    LOADING.....
                </div>
            }
            { !loading &&
                <div>
                    <p>listado de categorias....</p>
                </div>
            }
        </>
    )
}

export default Categories