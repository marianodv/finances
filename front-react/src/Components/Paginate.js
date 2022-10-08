import React, {useEffect,useState} from "react";
import Pagination from 'react-bootstrap/Pagination';

function Paginate(props){

    const {min, max, active, rowsCount, rowsPerPage} = props

    const [pagesList, setPagesList] = useState([])
    const [loading, setLoading] = useState(true)

    const createPaginate = () =>{
        for (let number = min; number <= max; number++) {
            setPagesList(...pagesList,
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>
            )
        }
        setLoading(false)
    }

    useEffect(
        ()=>{
            createPaginate()
        },
        []
    )

    return(
        <>
            {loading &&
                <p>{min} to page {active} to {max} | TOTAL: {rowsCount} | listed: {rowsPerPage}</p>
            }
            {!loading &&
                <Pagination size="sm">
                    {pagesList}
                </Pagination>
            }
        </>
    )
}

export default Paginate