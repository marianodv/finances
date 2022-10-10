import React, {useEffect,useState} from "react";
import {getAll} from "../Services/categoriesService"
import {useNavigate} from 'react-router-dom'
import Loading from "../Components/Loading";
import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"
import Table from 'react-bootstrap/Table'
import WithoutMovements from "../Components/WithoutMovements"
import Category from "../Components/Category";
import Card from 'react-bootstrap/Card';
import stylesExt from '../styles/cards'


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

   

    
   
    return(
        <div>
            <div>
                <ButtonWithoutLoading variant="create" onClick={()=>{navi('/categories/create')}}>NUEVA CATEGORIA</ButtonWithoutLoading>
            </div>
            <Loading loading={loading}>
            <Card style={stylesExt.cardContainer}>
                <Card.Header>Listado de Categorias</Card.Header>
                <Card.Body>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Denominacion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => 
                                <Category key={category._id} _id={category._id} name={category.name}/>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            {(categories.length === 0) &&
                    <WithoutMovements />
                }
            </Loading>
        </div>
    )
    
}

export default Categories


