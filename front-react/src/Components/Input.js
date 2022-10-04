function Input(props){
    const {label,type,placeHolder,name,change,register} = props
    return(
        <>
            <div>
                <label>{label || ""}</label>
                <input type={type || "text"} name={name || ""} placeholder = {placeHolder} onChange={change || ""} {...register}/>
            </div>
        </>
    )
}

export default Input