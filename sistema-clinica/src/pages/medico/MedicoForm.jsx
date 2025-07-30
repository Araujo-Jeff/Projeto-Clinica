import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const MedicoForm = () => {

    const apiUrl = import.meta.env.VITE_API_URL

    const { id } = useParams()

    const navigate = useNavigate()

    const [modalAberto, setModalAberto] = useState(false)

    const [medico, setMedico] = useState({
        nome: '',
        crm: '',
        especialidade: '',
        horario: '',
        diasAtendimento: ''

    })


    useEffect(() => {
        axios.get(`${apiUrl}/medicos/${id}`)
            .then(response => setMedico(response.data))
            .catch(error => console.error('Houve um erro ao carregar médico: ', error))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()

        const request = id
            ? axios.put(`${apiUrl}/medicos/${id}`, medico)
            : axios.post(`${apiUrl}/medicos`, medico)

        request.then(() => setModalAberto(true))
            .catch(error => console.error('Error ao cadastrar/editar Médico: ', error))

    }

    return (
        <Container className='mt-4'>
            <h2 className='mb-4 d-flex align-items center'>
                {id ? 'Editar Médico' : 'Adicionar Médico'}
                <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>Preencha os dados do Médico</Tooltip>}
                >
                    <span className='ms-2' style={{ cursor: 'pointer' }}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={8}>
                        <Form.Group className='mb3'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={medico.nome}
                                onChange={(e) => setMedico({ ...medico, 'nome': e.target.value })}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className='mb3'>
                            <Form.Label>CRM</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={medico.crm}
                                onChange={(e) => setMedico({ ...medico, 'crm': e.target.value })}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className='mb3'>
                            <Form.Label>Especialidade</Form.Label>
                            {/* <Form.Control
                                type='text'
                                required
                                value={medico.especialidade}
                                onChange={(e) => setMedico({ ...medico, 'especialidade': e.target.value })}
                            /> */}
                            <Form.Select
                                value={medico.especialidade}
                                onChange={(e) => setMedico({ ...medico, 'especialidade': e.target.value })}
                            >
                                <option value="Selecione">Selecione uma Especialidade</option>
                                <option value="Clinica">Clínica Médica</option>
                                <option value="Cardiologia">Cardiologia</option>
                                <option value="Neurologia"> Neurologia</option>
                                <option value="reumatologia"> Reumatologia</option>
                                <option value="Gastroenterologia">Gastroenterologia </option>
                                <option value="Endocrinologia"> Endocrinologia</option>
                                <option value="Nefrologia"> Nefrologia</option>
                                <option value="Otorrinolaringologia"> Otorrinolaringologia</option>
                                <option value="Dermatologista"> Dermatologista </option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className='mb3'>
                            <Form.Label>Horarios</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                placeholder='Ex.: 08:00 ás 12:00'
                                value={medico.horario}
                                onChange={(e) => setMedico({ ...medico, 'horario': e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className='mb3'>
                            <Form.Label>Dias de Atendimento</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                placeholder='Ex: Segunda, terça e quarta...'
                                value={medico.diasAtendimento}
                                onChange={(e) => setMedico({ ...medico, 'diasAtendimento': e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button className='mt-4' type='submit' variant='success'>
                    {id ? 'Salvar' : 'Adicionar'}
                </Button>

            </Form>

            <Modal show={modalAberto} onHide={() => { setModalAberto(false); navigate('/listar-medicos') }}>
                <Modal.Header closeButton>
                    <Modal.Title><FaCheckCircle className='text-success me-2' />
                        Sucesso:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {id ? 'Dados do Médico Editado com Sucesso!!!' : 'Médico adicionado com sucesso!'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={() => navigate('/listar-medicos')}>
                        Fechar
                    </Button>
                </Modal.Footer>

            </Modal>

        </Container>
    )
}

export default MedicoForm