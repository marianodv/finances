import {useNavigate} from 'react-router-dom'

function Category(props){

    const {_id,name} = props

    const navi = useNavigate()
    
    return(
        <tr onClick={()=>{navi('/categories/edit/' + _id)}}>
            <td>{_id}</td>
            <td>{String(name).toUpperCase()}</td>
        </tr>
    )
}

export default Category