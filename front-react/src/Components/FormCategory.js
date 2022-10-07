import React from "react";
import Input from "../Components/Input"

function FormCategory(props){

    const {children, submit, nameRegister, error} = props

    return(
        <form onSubmit={submit}>
            <Input label="Nombre" register={nameRegister}/>
            {error?.name  && <span>El campo nombre es obligatorio.</span>}
            <div>
                <button type="submit">GUARDAR</button>
                {children}
            </div>
        </form>
    )
}

export default FormCategory