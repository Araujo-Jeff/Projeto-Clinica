import React from 'react'
import { Card, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FaSignInAlt, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <Navbar bg='primary' variant='dark' expand='lg' sticky='top' className='shadow'>
            <Container>
                <Navbar.Brand className='fw-bold fs-3' as={Link} to={'/'} >
                    PrimeSaúde
                </Navbar.Brand>

                <Navbar.Toggle aria-controls='menu-principal' />
                <Navbar.Collapse id='menu-principal'>

                    <Nav className='ms-auto'>
                        <Nav.Link className='fs-5' as={Link} to={'/'}> <u>Inicio</u> </Nav.Link>
                        <Nav.Link className='fs-5' as={Link} to={'listar-consultas'}> <u> Agendar Consulta</u></Nav.Link>
                        <Nav.Link className='fs-5' as={Link} to={'listar-medicos'}> <u>Médicos</u> </Nav.Link>
                        <Nav.Link className='fs-5' as={Link} to={'listar-pacientes'}> <u>Pacientes</u> </Nav.Link>
                        <Nav.Link className='fs-5' as={Link} to={'#'}> <u>Contatos</u> </Nav.Link>
                    </Nav>

                    <Nav className='ms-auto'>
                        <NavDropdown
                            title={

                                <span>
                                    <FaUserCircle className='me-2 fs-5' />
                                    {/* Jeff */}
                                </span>
                            }>
                            <NavDropdown.Item>
                                Meu Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <FaSignInAlt className='me-2' />
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default Menu