import Button from 'react-bootstrap/Button'

const variants={
    create:"outline-primary",
    edit:"outline-secondary",
    delete:"outline-danger",
    view:"outline-success",
    info:"outline-info"
}

function ButtonWithoutLoading(props){

    const {loading,variant,type,children,onClick} = props

    return(
        <Button type = {type || 'button'} variant={variants[variant]} disabled={loading || false} onClick={onClick || null}>
            {children}
        </Button>
    )
}

export default ButtonWithoutLoading