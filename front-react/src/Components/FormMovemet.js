import React from "react";
import Input from "../Components/Input"
import CategoriesList from "../Components/CategoriesList";
import {useNavigate} from 'react-router-dom'
import ButtonWithLoading from './ButtonWithLoading'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import stylesExt from '../styles/cards'



function FormMovement(props){

    const {children, submit, changeCheckBox, checkedCheckBox, dateRegister, conceptRegister, amountRegister, categoryRegister,
        idDate, idConcept, idAmount, idCategory, idIsEgress, isEgressRegister, error} = props

    let typeButton = props.typeButton || 'submit'
     
    const navi = useNavigate()

    if (typeButton !== 'submit' && typeButton !== 'button'){
        typeButton = 'submit'
    }

    return(
        <Card border={(checkedCheckBox && 'danger') || (!checkedCheckBox && 'success')} style={stylesExt.cardContainer}>
            <Card.Body>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3">
                    <Input label="Fecha" type="date" controlId={idDate} register={dateRegister}/>
                    {error?.name && <Form.Text className="text-muted">El campo nombre es obligatorio.</Form.Text>}
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                    <Input label="Concepto" controlId={idConcept} register={conceptRegister}/>
                    {error?.concept && <Form.Text className="text-muted">El campo concepto es obligatorio.</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Input label="Monto" type="number" controlId={idAmount} register={amountRegister}/>
                        {error?.amount?.type === 'required' && <Form.Text className="text-muted">El campo monto es obligatorio.</Form.Text>}
                        {error?.amount?.type === 'min' && <Form.Text className="text-muted">El monto no puede ser negativo.</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <CategoriesList label="Categoria: " controlId={idCategory} register={categoryRegister}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        {(isEgressRegister || false) &&
                            <>
                                <Form.Check type="switch" onChange={changeCheckBox || {}} checked={checkedCheckBox || false} controlId={idIsEgress} register={isEgressRegister}/>
                                <Form.Label hidden={!checkedCheckBox}>Nuevo Gasto</Form.Label>
                                <Form.Label hidden={checkedCheckBox}>Nuevo Ingreso</Form.Label>
                            </>
                        }
                        {!isEgressRegister &&
                            <>
                                <Form.Label hidden={!checkedCheckBox}>Tipo: Gasto</Form.Label>
                                <Form.Label hidden={checkedCheckBox}>Tipo: Ingreso</Form.Label>
                            </>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {(typeButton === 'submit') &&
                            <ButtonWithLoading type="submit">GUARDAR</ButtonWithLoading>
                        }
                        {(typeButton === 'button') &&
                            <ButtonWithLoading type="button" onClick={submit}>GUARDAR</ButtonWithLoading>
                        }
                        <ButtonWithLoading type="button" variant="secondary" onClick={()=>{navi("/movements/")}}>VOLVER</ButtonWithLoading>
                        {children}
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default FormMovement