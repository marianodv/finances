import {Link} from "react-router-dom"

function Menu(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/categories/">Categorias</Link></li>
            <li><Link to="/movements/create/">Agregar</Link></li>
            <li><Link to="/movements/">Ver Todos</Link></li>
        </ul>
    )
}

export default Menu