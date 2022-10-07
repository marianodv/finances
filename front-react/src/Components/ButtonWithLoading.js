import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';


function ButtonWithLoading(props){

    const isLoading = props.isLoading || true
    const variant = props.variant || "primary"
    const click = props.click || null
    const children = props.children

    return(
        <>
            {
                isLoading &&
                <Button variant={variant} disabled={true} onClick={null}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>
            }
            {
                !isLoading &&
                <Button variant={variant} disabled={false} onClick={!isLoading && click}>{children}</Button>
            }
        </>
    )
}

export default ButtonWithLoading