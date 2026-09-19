
import { Navbar, Nav, Container } from 'react-bootstrap';

function Menu() {
  return (
    <Navbar style={{ backgroundColor: '#67001a' }} variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#">Tienda Ej</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#clientes">Clientes</Nav.Link>
            <Nav.Link href="#productos">Productos</Nav.Link>
            <Nav.Link href="#ventas">Ventas</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
