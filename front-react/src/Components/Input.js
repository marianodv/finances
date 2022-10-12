import Form from 'react-bootstrap/Form'

function Input(props){
    const {label,type,placeholder, register} = props
    return(
        <Form.Group className="mb-3">
            <Form.Label>{label || ""}</Form.Label>
            <Form.Control type={type || "text"} placeholder = {placeholder || ""} {...register}/>
        </Form.Group>
    )
}

export default Input