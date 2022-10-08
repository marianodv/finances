import React, {useEffect,useState} from "react";
import Pagination from 'react-bootstrap/Pagination';

function Paginate(props){

    const {min, max, active, rowsCount, rowsPerPage} = props.data

    const [pagesList, setPagesList] = useState([])
    const [loading, setLoading] = useState(true)

    const createPaginate = () =>{
        console.log("pag", min,max,active, rowsCount, rowsPerPage)
        let aux=[]
        for (let number = min; number <= max; number++) {
            aux.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>
            )
        }
        setPagesList(aux)
        setLoading(false)
    }

    useEffect(
        ()=>{
            createPaginate()
        },
        // eslint-disable-next-line
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