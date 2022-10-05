import React,{useEffect,useState} from "react";

function Categories(){

    const [loading,setLoading] = useState(true)

    useEffect(
        ()=>{
            
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