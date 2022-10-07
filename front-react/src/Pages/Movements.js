import React, {useEffect,useState} from "react";
import Movement from "../Components/Movement";
import {getAll,deleteById, getIncomes, getExpenses, getByCategory} from "../Services/movementsServices"
import CategoriesList from "../Components/CategoriesList"
import {useForm} from "react-hook-form"
import ButtonWithLoading from "../Components/ButtonWithLoading"
import Loading from "../Components/Loading";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'

function Movements(){

    const [loading,setLoading] = useState(true)
    const [movements,setMovements] = useState([])

    const { register,setValue, getValues} = useForm()

    useEffect(
        ()=>{
            listAll()
        },
        // eslint-disable-next-line
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

  
   
        return(
            <>
                <Container>
                    <Row style={{marginTop:'1rem'}}>
                        <Col>
                            <CategoriesList label="Categorias: " register={{...register("category")}}/>
                        </Col>
                        <Col>
                            <ButtonWithLoading type="button" loading={loading} click={()=>{
                                setLoading(true)
                                listForCategory()
                            }}>Por Categoria</ButtonWithLoading>
                        </Col>
                    </Row>
                    
                    <Row style={{marginTop:'1rem'}}>
                        <Col>
                            <ButtonWithLoading type="button" loading={loading} click={()=>{
                                setLoading(true);setTimeout(()=>{listAll()},2000)
                            }}>TODO</ButtonWithLoading>
                        </Col>

                        <Col>
                            <ButtonWithLoading type="button" loading={loading} click={()=>{
                                setLoading(true)
                                listIngress()
                            }}>Solo Ingresos</ButtonWithLoading>
                        </Col>

                        <Col>
                            <ButtonWithLoading type="button" loading={loading} click={()=>{
                                setLoading(true)
                                listEgress()
                            }}>Solo Egresos</ButtonWithLoading>
                        </Col>
                    </Row>
                </Container>

                <Loading loading={loading}>

                    <Table striped style={{marginTop:'1rem'}}>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Concepto</th>
                            <th>Categoria</th>
                            <th>Monto</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movements?.rows?.map((movement,ind) => <Movement key={ind} data={movement} onDelete={()=>{handleDelete(movement._id)}} />)}
                        </tbody>
                    </Table>
                    <p>{movements?.pageMin} to page {movements?.page} to {movements?.pageMax} | TOTAL: {movements?.rowsCount} | listed: {movements?.rowsPerPage}</p>

                    <div>
                        {movements?.rows?.map((movement,ind) => <Movement key={ind} data={movement} onDelete={()=>{handleDelete(movement._id)}}>{ind+1}</Movement>)}  
                        <p>{movements?.pageMin} to page {movements?.page} to {movements?.pageMax} | TOTAL: {movements?.rowsCount} | listed: {movements?.rowsPerPage}</p>
                    </div>
                </Loading>
            </>
        )
    
}

export default Movements


