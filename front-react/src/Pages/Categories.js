import React, {useEffect,useState} from "react";
import {getAll} from "../Services/categoriesService"
import {useNavigate} from 'react-router-dom'
import Loading from "../Components/Loading";
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"
import Table from 'react-bootstrap/Table'
import WithoutMovements from "../Components/WithoutMovements"


const styles={
    absCenter:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    absCenterIntern:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth:'600px',
        width:'85%'
    },
      
    table:{
        marginTop:'1rem'
    }
}


function Categories(){

    const [loading,setLoading] = useState(true)
    const [categories,setCategories] = useState([])
    
    const navi = useNavigate()


    useEffect(
        ()=>{
            const request = async()=>{ 
                try{          
                    const response = await getAll()
                    //console.log("LST: ",response?.data)
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


    
   
    return(
        <div>
            <div>
                <ButtonWithoutLoading variant="create" onClick={()=>{navi('/categories/create')}}>NUEVA CATEGORIA</ButtonWithoutLoading>
            </div>
            <Loading loading={loading}>
                <div style={styles.absCenter}>
                    <div style={styles.absCenterIntern}>
                        <Table striped style={styles.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Denominacion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => 
                                    <tr key={category._id}>
                                        <td>{category._id}</td>
                                        <td>{String(category.name).toUpperCase()}</td>
                                        <td>
                                            <ButtonWithoutLoading variant="edit" onClick={()=>{handleEditar(category._id)}}>EDITAR</ButtonWithoutLoading>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </div>
                {(categories.length === 0) &&
                    <WithoutMovements />
                }
            </Loading>
        </div>
    )
    
}

export default Categories


