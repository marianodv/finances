import Spinner from 'react-bootstrap/Spinner';


function Loading(props){

    const {loading,variant,children} = props

    return(
        <>
            {loading &&
                <Spinner
                    animation="border"
                    variant={variant || 'primary'}
                />
            }
            {!loading &&
                children || 'LOADING...'
            }
        </>
    )
}

export default Loading