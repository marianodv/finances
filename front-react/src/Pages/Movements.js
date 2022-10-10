import React, {useEffect,useState} from "react";
import Movement from "../Components/Movement";
import {getAll, getIncomes, getExpenses, getByCategory} from "../Services/movementsServices"
import CategoriesList from "../Components/CategoriesList"
import {useForm} from "react-hook-form"
import ButtonWithLoading from "../Components/ButtonWithLoading"
import Loading from "../Components/Loading";
import Table from 'react-bootstrap/Table'
import ButtonWithoutLoading from '../Components/ButtonWithoutLoading';
import {useNavigate} from 'react-router-dom'
import Paginate from "../Components/Paginate";
import WithoutMovements from "../Components/WithoutMovements"
import Card from 'react-bootstrap/Card';
import stylesExt from '../styles/cards'
import ListGroup from 'react-bootstrap/ListGroup';


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
            <ButtonWithoutLoading variant="create" onClick={()=>{navi('/movements/create')}} style={{marginTop:'1rem'}}>NUEVO MOVIMIENTO</ButtonWithoutLoading>
            <Card style={stylesExt.cardContainer}>
                <Card.Header>Filtros</Card.Header>
                <Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <CategoriesList label="Categorias: " register={{...register("category")}}/>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            setCurrentPage(1)
                            setListFor('category')
                        }}>Por Categoria</ButtonWithLoading>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true);setCurrentPage(1);setListFor('all');
                        }}>TODO</ButtonWithLoading>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            setCurrentPage(1)
                            setListFor('incomes')
                        }}>Solo Ingresos</ButtonWithLoading>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            setCurrentPage(1)
                            setListFor('expenses')
                        }}>Solo Egresos</ButtonWithLoading>
                    </ListGroup.Item>
                </ListGroup>
                    
                </Card.Body>
            </Card>
            <Loading loading={loading}>
                <Card style={stylesExt.cardContainer}>
                    <Card.Header>Listado de Movimientos</Card.Header>
                    <Card.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fecha</th>
                                    <th>Concepto</th>
                                    <th>Categoria</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movements?.rows?.map((movement,ind) => <Movement key={ind} data={movement} />)}
                            </tbody>
                        </Table>
                        {(movements.rowsCount === 0) &&
                            <WithoutMovements />
                        }
                        <Paginate handlerPrevPage={()=>{handlerPrevPage()}} handlerNextPage={()=>{handlerNextPage()}} currentPage={currentPage} pageMin={movements?.pageMin} pageMax={movements?.pageMax} />
                    </Card.Body>
                </Card>
            </Loading>
        </>
    )
}

export default Movements