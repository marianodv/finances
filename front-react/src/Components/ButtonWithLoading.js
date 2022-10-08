import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';


function ButtonWithLoading(props){

    const {loading,variant,type,children,onClick} = props

    return(
        <Button type = {type || 'submit'} variant={variant || 'primary'} disabled={loading} onClick={onClick}>
            {loading &&
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
            }
            {children}
        </Button>
    )
}

export default ButtonWithLoading