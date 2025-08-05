import React from 'react'
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaHospitalUser, FaStethoscope, FaCalendarPlus } from 'react-icons/fa'
import Logo from '../assets/Logo_Clinica.png'


const Inicial = () => {
    return (
        // <div className='bg-secondary' style={{ minHeight: '100vh' }}>
        <Container className='mt-5'>
            <Form>
                <Row className="justify-content-center" >
                    <Col md={4}>
                        <Card className='mb-4 bg-primary text-white text-center text-decoration-none border rounded-4' as={Link} to={'/listar-consultas'}>
                            <Card.Body>
                                <FaCalendarPlus size={40} />
                                <Card.Title className='fs-3'>Consultas</Card.Title>
                                <Button variant='light'>Agendar</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <hr />

                    <Col md={4}>
                        <Card className='mb-4 bg-primary text-white text-center text-decoration-none border rounded-4 ' as={Link} to={'/listar-medicos'}>
                            <Card.Body>
                                <FaStethoscope size={40} />
                                <Card.Title className='fs-3'>Médicos</Card.Title>
                                <Button variant='light'>Cadastro</Button>
                            </Card.Body>
                        </Card>
                    </Col>



                    <Col md={4}>
                        <Card className='mb-4 bg-primary text-white text-center text-decoration-none border rounded-4' as={Link} to={'/listar-pacientes'}>
                            <Card.Body >
                                <FaHospitalUser size={40} />
                                <Card.Title className='fs-3'>Pacientes</Card.Title>
                                <Button variant='light'>Cadastro</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <hr />

            </Form>
        </Container>

        // </div>
    )
}


export default Inicial