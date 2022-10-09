import React from "react";
import Pagination from 'react-bootstrap/Pagination';

const styles={
    absCenter:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'1rem'
    },

    center:{
        maxWidth:'600px'
    }
}

function Paginate(props){

    const {handlerPrevPage,handlerNextPage,currentPage,pageMin,pageMax} = props

    return(
        <div style={styles.absCenter}>
            <Pagination size="sm" style={styles.center}>
                <Pagination.Item key={1} disabled={(pageMin || 1) === currentPage} onClick={handlerPrevPage}>
                    Anterior
                </Pagination.Item>
                <Pagination.Item key={2} disabled={true}>
                    {currentPage} de {pageMax}
                </Pagination.Item>
                <Pagination.Item key={3} disabled={pageMax === currentPage} onClick={handlerNextPage}>
                    Siguiente
                </Pagination.Item>
            </Pagination>
        </div>
    )
}

export default Paginate