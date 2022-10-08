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
import {useNavigate,useLocation} from 'react-router-dom'
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

    const useQuery = () => new URLSearchParams(useLocation().search);

    const query = useQuery()

    const [loading,setLoading] = useState(true)

    const [movements,setMovements] = useState([])
    
    const { register,setValue, getValues} = useForm()

    const [listFor, setListFor] = useState('') // '' | 'incomes' | 'expenses' | 'all' | 'category'

    const navi = useNavigate()

    const [withPaginate, setWithPaginate] = useState({})

    useEffect(
        ()=>{
            setList()
        },
        // eslint-disable-next-line
        [listFor]
    )

    const setList = () =>{
        if (listFor === '' || listFor === 'all'){
            listAll()
        }
        if (listFor === 'incomes'){
            listIngress()
        }
        if (listFor === 'expenses'){
            listEgress()
        }
        if (listFor === 'category'){
            listForCategory()
        }
    }

    const listAll = async () =>{
        try{          
            setValue("category",0)
            const response = await getAll(query.get('page'))
            console.log("LST: ",response?.data)
            //console.log("QRY: ",query.get('page'))
            setMovements(response?.data)

            setWithPaginate(response?.data)

            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listForCategory = async () =>{
        try{          
            const response = await getByCategory(getValues("category"),query.get('page'))
            console.log("LST: ",response?.data)
            setMovements(response?.data)
            setWithPaginate(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listIngress = async () =>{
        try{    
            setValue("category",0)      
            const response = await getIncomes(query.get('page'))
            console.log("LST: ",response?.data)
            setMovements(response?.data)
            setWithPaginate(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
        }
    }

    const listEgress = async () =>{
        try{      
            setValue("category",0)    
            const response = await getExpenses(query.get('page'))
            console.log("LST: ",response?.data)
            setMovements(response?.data)
            setWithPaginate(response?.data)
            setLoading(false)
        }catch (error){
            console.log("Error: ", error)
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
                            setListFor('category')
                        }}>Por Categoria</ButtonWithLoading>
                    </Col>
                </Row>
                
                <Row style={{marginTop:'1rem'}}>
                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true);setTimeout(()=>{setListFor('all')},2000)
                        }}>TODO</ButtonWithLoading>
                    </Col>

                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            setListFor('incomes')
                        }}>Solo Ingresos</ButtonWithLoading>
                    </Col>

                    <Col>
                        <ButtonWithLoading type="button" variant="info" loading={loading} onClick={()=>{
                            setLoading(true)
                            setListFor('expenses')
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
                <Paginate data={withPaginate} />
                <p>{movements?.pageMin} to page {movements?.page} to {movements?.pageMax} | TOTAL: {movements?.rowsCount} | listed: {movements?.rowsPerPage}</p>
            </Loading>
        </>
    )
    //<Paginate data={withPaginate} />
}

export default Movements


