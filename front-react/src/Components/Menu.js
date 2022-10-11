import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu(){
    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">MyFinances App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <NavDropdown title="Categorias" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/categories/create">Crear Categoria</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/categories/">Ver Todas</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Movimientos" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="movements/create/false">Agregar Nuevo Ingreso</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/movements/create/true">Agregar Nuevo Gasto</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/movements/">Ver Todos</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Menu