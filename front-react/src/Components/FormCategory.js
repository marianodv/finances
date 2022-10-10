import React from "react";
import Input from "../Components/Input"
import Form from 'react-bootstrap/Form'
import {useNavigate} from 'react-router-dom'
import ButtonWithLoading from './ButtonWithLoading'


const styles={
    absCenter:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    },

    absCenterIntern:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'500px',
        height:'250px',
        backgroundColor:'#96f1ff'
    },

    form:{
        width:'450px'
    }
}

function FormCategory(props){

    const {children, submit, idName, nameRegister, error} = props

    let typeButton = props.typeButton || 'submit'

    const navi = useNavigate()

    if (typeButton !== 'submit' && typeButton !== 'button'){
        typeButton = 'submit'
    }

    return(
        <div style={styles.absCenter}>
            <div style={styles.absCenterIntern}>
                <Form onSubmit={submit} style={styles.form}>
                    <Form.Group className="mb-3">
                        <Input label="Nombre de la Nueva Categoria" placeholder="Ingrese el nombre de la categoria" controlId={idName} register={nameRegister}/>
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
                        <ButtonWithLoading type="button" variant="secondary" onClick={()=>{navi('/categories/')}}>CANCELAR</ButtonWithLoading>
                        {children}  
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default FormCategory