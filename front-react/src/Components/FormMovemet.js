import React from "react";
import Input from "../Components/Input"
import CategoriesList from "../Components/CategoriesList";
import {useNavigate} from 'react-router-dom'

function FormMovement(props){

    const {children, submit, changeCheckBox, checkedCheckBox, dateRegister, conceptRegister, amountRegister, categoryRegister, isEgressRegister, error} = props

    const navi = useNavigate()

    return(
        <form onSubmit={submit}>
            <Input label="Fecha" type="date" register={dateRegister}/>
            {error?.name && <span>El campo nombre es obligatorio.</span>}
        
            <Input label="Concepto" register={conceptRegister}/>
            {error?.concept && <span>El campo concepto es obligatorio.</span>}

            <Input label="Monto" type="number" register={amountRegister}/>
            {error?.amount?.type === 'required' && <span>El campo monto es obligatorio.</span>}
            {error?.amount?.type === 'min' && <span>El monto no puede ser negativo.</span>}

            <CategoriesList label="Categoria: " register={categoryRegister}/>
            
            {(isEgressRegister || false) &&
                <div>
                    <label>Es Egreso: </label>
                    <input type="checkbox" onChange={changeCheckBox || {}} checked={checkedCheckBox || false} register={isEgressRegister}/>
                </div>
            }
            {(!isEgressRegister) &&
                <div>
                    <label hidden={!checkedCheckBox}>Es Egreso</label>
                    <label hidden={checkedCheckBox}>Es Ingreso</label>
                </div>
            }
            
            <div>
                <button type="submit">GUARDAR</button>
                <button type="buttom" onClick={()=>{navi("/movements/")}}>CANCELAR</button>
                {children}
            </div>
        </form>
    )
}

export default FormMovement