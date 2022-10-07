import React from "react";
import Input from "../Components/Input"
import CategoriesList from "../Components/CategoriesList";

function FormMovement(props){

    const {children, submit, changeCheckBox, checkedCheckBox, dateRegister, conceptRegister, amountRegister, categoryRegister, isEgressRegister, error} = props

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
            
            <div>
                <button type="submit">GUARDAR</button>
                {children}
            </div>
        </form>
    )
}

export default FormMovement