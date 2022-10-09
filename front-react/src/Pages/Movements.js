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
import Paginate from "../Components/Paginate";


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

    const [loading,setLoading] = useState(true) //check if is loading

    const [movements,setMovements] = useState([]) //list of movements
    
    const { register,setValue, getValues} = useForm() //for capture value of CategoriesList

    const [listFor, setListFor] = useState('') // '' | 'incomes' | 'expenses' | 'all' | 'category'

    const navi = useNavigate() //for button NUEVO INGRESO

    const [currentPage, setCurrentPage] = useState(1) //for paginate, to view current page

    useEffect(
        ()=>{
            setList()
        },
        // eslint-disable-next-line
        [listFor,currentPage]
    )

    const setList = async () =>{
        if (listFor === '' || listFor === 'all'){
            await listAll()
        }
        if (listFor === 'incomes'){
            await listIngress()
        }
        if (listFor === 'expenses'){
            await listEgress()
        }
        if (listFor === 'category'){
            await listForCategory()
        }
    }

    const listAll = async () =>{
        try{          
            setValue("category",0)
            const response = await getAll(currentPage)
            //console.log("LST: ",response?.data)
            //console.log("QRY: ",query.get('page'))
            setMovements(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listForCategory = async () =>{
        try{          
            const response = await getByCategory(getValues("category"),currentPage)
            //console.log("LST: ",response?.data)
            setMovements(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listIngress = async () =>{
        try{    
            setValue("category",0)      
            const response = await getIncomes(currentPage)
            //console.log("LST: ",response?.data)
            setMovements(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listEgress = async () =>{
        try{      
            setValue("category",0)    
            const response = await getExpenses(currentPage)
            //console.log("LST: ",response?.data)
            setMovements(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }


    const handlerPrevPage = () => {
        if (currentPage > movements.pageMin){
            setCurrentPage(currentPage - 1)
        }
    }

    const handlerNextPage =() => {
        if (currentPage < movements.pageMax){
            setCurrentPage(currentPage + 1)
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
                            setCurrentPage(1)
                            setListFor('category')
                        }}>Por Categoria</ButtonWithLoading>
                    </Col>
                </Row>
                
                <Row style={{marginTop:'1rem'}}>
                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true);setTimeout(()=>{setCurrentPage(1);setListFor('all')},2000)
                        }}>TODO</ButtonWithLoading>
                    </Col>

                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            setCurrentPage(1)
                            setListFor('incomes')
                        }}>Solo Ingresos</ButtonWithLoading>
                    </Col>

                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            setCurrentPage(1)
                            setListFor('expenses')
                        }}>Solo Egresos</ButtonWithLoading>
                    </Col>
                </Row>
            </Container>
            <Loading loading={loading}>
                <Paginate handlerPrevPage={()=>{handlerPrevPage()}} handlerNextPage={()=>{handlerNextPage()}} currentPage={currentPage} pageMax={movements?.pageMax} />
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
                        {(movements.rowsCount === 0) &&
                            <div><h3>Sin movimientos...</h3></div>
                        }
                    </div>
                </div>
                {(movements.rowsCount === 0) &&
                    <div><h3>Sin movimientos...</h3></div>
                }
                <Paginate handlerPrevPage={()=>{handlerPrevPage()}} handlerNextPage={()=>{handlerNextPage()}} currentPage={currentPage} pageMin={movements?.pageMin} pageMax={movements?.pageMax} />
            </Loading>
        </>
    )
}

export default Movements