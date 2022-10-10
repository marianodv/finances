import React from "react";
import Input from "../Components/Input"
import Form from 'react-bootstrap/Form'
import {useNavigate} from 'react-router-dom'
import ButtonWithLoading from './ButtonWithLoading'
import Card from 'react-bootstrap/Card';
import stylesExt from '../styles/cards'


function FormCategory(props){

    const {children, submit, idName, nameRegister, error} = props

    let typeButton = props.typeButton || 'submit'

    const navi = useNavigate()

    if (typeButton !== 'submit' && typeButton !== 'button'){
        typeButton = 'submit'
    }

    return(
        <Card style={stylesExt.cardContainer}>
            <Card.Body>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3">
                        <Input label="Nombre de la Categoria" placeholder="Ingrese el nombre de la categoria" controlId={idName} register={nameRegister}/>
                        {error?.name  &&
                            <Form.Text className="text-muted">
                                El campo nombre es obligatorio.
                            </Form.Text>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        {(typeButton === 'submit') &&
                            <ButtonWithLoading type="submit">GUARDAR</ButtonWithLoading>
                        }
                        {(typeButton === 'button') &&
                            <ButtonWithLoading type="button" onClick={submit}>GUARDAR</ButtonWithLoading>
                        }
                        <ButtonWithLoading type="button" variant="secondary" onClick={()=>{navi('/categories/')}}>VOLVER</ButtonWithLoading>
                        {children}  
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default FormCategory