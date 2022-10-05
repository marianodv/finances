function Input(props){
    const {label,type,placeHolder,name, register} = props
    return(
        <>
            <div>
                <label>{label || ""}</label>
                <input type={type || "text"} name={name || ""} placeholder = {placeHolder || ""} {...register}/>
            </div>
        </>
    )
}

export default Input