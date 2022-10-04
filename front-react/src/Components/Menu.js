import {Link} from "react-router-dom"

function Menu(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movements/create/">Agregar</Link></li>
            <li><Link to="/movements/">Detalles</Link></li>
        </ul>
    )
}

export default Menu