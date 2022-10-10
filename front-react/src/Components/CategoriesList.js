import React,{useEffect,useState} from "react";
import {getAll} from "../Services/categoriesService"
import Form from 'react-bootstrap/Form'
import Loading from '../Components/Loading'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toCapitalize from "../utils/toCapitalize"

function CategoriesList(props){

    const {label, register} = props
    const [loading,setLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(
        ()=>{
            const request = async () => {
                try{
                    const cat = await getAll()
                    //console.log("cat: ", cat.data)
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
        <Loading loading={loading}>
            <Container>
                <Row>
                    <Col>
                        <label>{label || ""}</label>
                    </Col>
                    <Col xs={9}>
                        <Form.Select aria-label="Default select example" {...register}>
                            <option value={0}>-- SELECCIONE --</option>
                            {categories.map((category, item) => <option key={item} value={category._id}>{toCapitalize(category.name)}</option>)}
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
        </Loading>
    )
}

export default CategoriesList