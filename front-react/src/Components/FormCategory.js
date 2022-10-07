import React from "react";

function FormCategory(props){

    const {children, submit, nameRegister} = props

    return(
        <form onSubmit={submit}>
            <Input label="Nombre" {...nameRegister} />
            {errors.name && <span>El campo nombre es obligatorio.</span>}
            <div>
                <button type="submit">GUARDAR</button>
                {children}
            </div>
        </form>
    )
}

export default FormCategory