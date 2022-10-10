import ButtonWithoutLoading from "../Components/ButtonWithoutLoading"

function Category(props){

    const {_id,name,onClick} = props
    
    return(
        <tr>
            <td>{_id}</td>
            <td>{String(name).toUpperCase()}</td>
            <td>
                <ButtonWithoutLoading variant="edit" onClick={onClick}>EDITAR</ButtonWithoutLoading>
            </td>
        </tr>
    )
}

export default Category