import React from "react";
import Input from "./Input"
import CategoriesList from "./CategoriesList";
import {useNavigate} from 'react-router-dom'
import ButtonWithLoading from './ButtonWithLoading'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import stylesExt from '../styles/cards'


function FormMovement(props){

    const {children, submit, changeCheckBox, checkedCheckBox, dateRegister, conceptRegister, amountRegister, categoryRegister,
        isEgressRegister, errors} = props

    let typeButton = props.typeButton || 'submit'
     
    const navi = useNavigate()

    if (typeButton !== 'submit' && typeButton !== 'button'){
        typeButton = 'submit'
    }

    return(
        <div style={stylesExt.absCenter}>
        <Card text='white' bg={(checkedCheckBox && 'danger') || (!checkedCheckBox && 'success')} style={stylesExt.cardContainerForm}>
            <Card.Body>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3">
                        {(isEgressRegister || false) &&
                            <>
                                <Form.Check type="switch" onChange={changeCheckBox || {}} checked={checkedCheckBox || false} register={isEgressRegister}/>
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
                    <Input label="Fecha" type="date" register={dateRegister}/>
                    {errors?.date && <Form.Text className="text-muted">La fecha es obligatoria.</Form.Text>}
                    </Form.Group>
                
                    <Form.Group className="mb-3">
                    <Input label="Concepto" register={conceptRegister}/>
                    {errors?.concept?.type === 'required' && <Form.Text className="text-muted" style={{backgroundColor:'whitesmoke'}}>El campo concepto es obligatorio.</Form.Text>}
                    {(errors?.concept?.type === 'minLength' || errors?.concept?.type === 'maxLength') && 
                        <Form.Text className="text-muted" style={{backgroundColor:'whitesmoke'}}>
                            El campo concepto debe tener entre 5 y 70 caracteres.
                        </Form.Text>
                    }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Input label="Monto" type="number" register={amountRegister}/>
                        {errors?.amount?.type === 'required' && <Form.Text className="text-muted" style={{backgroundColor:'whitesmoke'}}>El campo monto es obligatorio.</Form.Text>}
                        {errors?.amount?.type === 'min' && <Form.Text className="text-muted" style={{backgroundColor:'whitesmoke'}}>El monto no puede ser negativo.</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <CategoriesList label="Categoria: " register={categoryRegister}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {(typeButton === 'submit') &&
                            <ButtonWithLoading type="submit">GUARDAR</ButtonWithLoading>
                        }
                        {(typeButton === 'button') &&
                            <ButtonWithLoading type="button" onClick={submit}>GUARDAR</ButtonWithLoading>
                        }
                        {'  '}<ButtonWithLoading type="button" variant="secondary" onClick={()=>{navi("/movements/")}}>VOLVER</ButtonWithLoading>{'  '}
                        {children}
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        </div>
    )
}

export default FormMovement