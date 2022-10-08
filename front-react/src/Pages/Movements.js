import React, {useEffect,useState} from "react";
import Movement from "../Components/Movement";
import {getAll, getIncomes, getExpenses, getByCategory} from "../Services/movementsServices"
import CategoriesList from "../Components/CategoriesList"
import {useForm} from "react-hook-form"
import ButtonWithLoading from "../Components/ButtonWithLoading"
import Loading from "../Components/Loading";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import ButtonWithoutLoading from '../Components/ButtonWithoutLoading';
import {useNavigate} from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination';

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


function Movements(){

    const [loading,setLoading] = useState(true)
    const [movements,setMovements] = useState([])
    
    let pages=[]

    const { register,setValue, getValues} = useForm()

    const navi = useNavigate()

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

            createPaginate(response?.data?.pageMin,response?.data?.pageMax,response?.data?.page)
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

    const createPaginate = (min, max, active) =>{
        for (let number = min; number <= max; number++) {
            pages.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>
            );
        }
    }
    
   
    return(
        <>
            <Container>
                <Row style={{marginTop:'1rem'}}>
                    <Col>
                        <ButtonWithoutLoading variant="create" onClick={()=>{navi('/movements/create')}}>NUEVO MOVIMIENTO</ButtonWithoutLoading>
                    </Col>
                </Row>

                <Row style={{marginTop:'1rem'}}>
                    <Col>
                        <CategoriesList label="Categorias: " register={{...register("category")}}/>
                    </Col>
                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            listForCategory()
                        }}>Por Categoria</ButtonWithLoading>
                    </Col>
                </Row>
                
                <Row style={{marginTop:'1rem'}}>
                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true);setTimeout(()=>{listAll()},2000)
                        }}>TODO</ButtonWithLoading>
                    </Col>

                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            listIngress()
                        }}>Solo Ingresos</ButtonWithLoading>
                    </Col>

                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            listEgress()
                        }}>Solo Egresos</ButtonWithLoading>
                    </Col>
                </Row>
            </Container>

            <Loading loading={loading}>
                <div style={styles.absCenter}>
                    <div style={styles.absCenterIntern}>
                        <Table striped style={styles.table}>
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
                                {movements?.rows?.map((movement,ind) => <Movement key={ind} data={movement} />)}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Pagination size="sm">
                    <Pagination.Item key={1} active={true}>
                        1
                    </Pagination.Item>
                    <Pagination.Item key={2} active={false}>
                        2
                    </Pagination.Item>
                    <Pagination.Item key={3} active={false}>
                        3
                    </Pagination.Item>
                </Pagination>
                <p>{movements?.pageMin} to page {movements?.page} to {movements?.pageMax} | TOTAL: {movements?.rowsCount} | listed: {movements?.rowsPerPage}</p>
            </Loading>
        </>
    )
    
}

export default Movements


