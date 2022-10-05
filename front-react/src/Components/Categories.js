import React,{useEffect,useState} from "react";
import {getAll} from "../Services/categoriesService"

function Categories(props){

    const {label, register} = props
    const [loading,setLoading] = useState(true)
    const [categories, setCategories] = useState([])

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
                    <label>{label || ""}</label>
                    <select {...register}>
                        <option value={0}>-- SELECCIONE --</option>
                        {categories.map((category, item) => <option key={item} value={category._id}>{category.name}</option>)}
                    </select>
                </div>
            }
        </>
    )
}

export default Categories