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

    const navi = useNavigate() //for button NUEVO INGRESO

    const [currentPage, setCurrentPage] = useState(1) //for paginate, to view current page

    let typeList = 'all' //all - category - ingress - egress
    
    useEffect(
        ()=>{
            switch (typeList) {
                case 'all':
                    listAll()
                    break;
                case 'category':
                    listForCategory()
                    break;
                case 'ingress':
                    listIngress()
                    break;
                case 'egress':
                    listEgress()
                    break;
                default:
                    break;
            }
            listAll()
        },
        // eslint-disable-next-line
        [currentPage]
    )


    const listAll = async () =>{
        typeList = 'all'
        try{          
            setLoading(true)
            setValue("category",0)
            setCurrentPage(1)
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
        //console.log("click",getValues("category"));
        typeList = 'category'
        try{          
            setLoading(true)
            setCurrentPage(1)
            setMovements({})
            const response = await getByCategory(getValues("category"),currentPage)
            //setValue("category",response?.data?.rows[0]?.category?._id)
            //console.log("LST: ",getValues("category"),response?.data)
            setMovements(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listIngress = async () =>{
        typeList = 'ingress'
        try{    
            setLoading(true)
            setValue("category",0)     
            setCurrentPage(1) 
            const response = await getIncomes(currentPage)
            //console.log("LST: ",response?.data)
            setMovements(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listEgress = async () =>{
        typeList = 'egress'
        try{      
            setLoading(true)
            setValue("category",0)  
            setCurrentPage(1)  
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
                            listForCategory()
                        }}>Por Categoria</ButtonWithLoading>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            listAll()
                        }}>TODO</ButtonWithLoading>{'  '}
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            listIngress()
                        }}>Solo Ingresos</ButtonWithLoading>{'  '}
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            listEgress()
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
                        <Paginate 
                            handlerPrevPage={()=>{handlerPrevPage()}} 
                            handlerNextPage={()=>{handlerNextPage()}} 
                            currentPage={currentPage} 
                            pageMin={movements?.pageMin} 
                            pageMax={movements?.pageMax}
                        />
                    </Card.Body>
                </Card>
            </Loading>
        </>
    )
}

export default Movements