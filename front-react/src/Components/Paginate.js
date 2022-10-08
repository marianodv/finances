import React, {useEffect,useState} from "react";
import Pagination from 'react-bootstrap/Pagination';
import {useNavigate} from "react-router-dom"

function Paginate(props){

    const {pageMin, pageMax, page, rowsCount, rowsPerPage, pagePrev, pageNext} = props.data

    const [pagesList, setPagesList] = useState([])
    const [loading, setLoading] = useState(true)

    const navi = useNavigate()

    const goTo = (goUrl) =>{  
        navi(goUrl)
    }

    const createPaginate = () =>{
        console.log("pag props", props.data)
        console.log("pag", pageMin, pageMax, page, rowsCount, rowsPerPage, pagePrev, pageNext)
        let aux=[]
        
        for (let number = pageMin; number <= pageMax; number++) {
            aux.push(
                <Pagination.Item key={number} /*active={number === page}*/disabled={number === page} onClick={()=>{goTo('/movements/?page=' + number)}}>
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
                <p>{pageMin} to page {page} to {pageMax} | TOTAL: {rowsCount} | listed: {rowsPerPage}</p>
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