import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

const ConsultaForm = () => {

    const [medicos, setMedicos] = useState([])

    const [pacientes, setPacientes] = useState([])

    const { id } = useParams()

    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL

    const [modalAberto, setModalAberto] = useState(false)

    const [consulta, setConsulta] = useState({
        paciente: '',
        especialidade: '',
        medico: '',
        horario: '',
        situacao: ''
    })

    // useEffect(() => {
    //     if (id) {
    //         axios.get(`${apiUrl}/consultas/${id}`)
    //             .then(response => {
    //                 setConsulta({
    //                     ...response.data,
    //                     medicoId: response.data.medico ? response.data.medico.id : '',
    //                     pacienteId: response.data.paciente ? response.data.paciente.id : ''
    //                 })
    //             })
    //             .catch(error => console.error('Houve um erro ao carregar consulta: ', error))
    //     }
    // }, [id, apiUrl])

    useEffect(() => {
        axios.get(`${apiUrl}/consultas/${id}`)
            .then(response => setConsulta(response.data))
            .catch(error => console.error('Houve um erro ao carregar consulta: ', error))
    }, [apiUrl])

    // useEffect(() => {
    //     axios.get(`${apiUrl}/medicos`)
    //         .then(response => setMedicos(response.data))
    //         .catch(error => console.error('Houve um erro ao carregar Médico: ', error))
    // }, [apiUrl])

    // useEffect(() => {  // esse
    //     axios.get(`${apiUrl}/pacientes`)
    //         .then(response => setPacientes(response.data))
    //         .catch(error => console.error('Houve um erro ao carregar Paciente: ', error))
    // }, [apiUrl])



    const handleSubmit = (e) => {
        e.preventDefault()

        const request = id
            ? axios.put(`${apiUrl}/consultas/${id}`, consulta)
            : axios.post(`${apiUrl}/consultas`, consulta)

        request.then(() => setModalAberto(true))
            .catch(error => console.error('Error ao cadastrar/editar consulta: ', error))
    }

    return (

        <Container className='mt-4'>

            <h2 className='mb-4 d-flex align-items-center'>
                {id ? 'Editar Consulta' : 'Agendar Consulta'}
                <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>Preencha os dados da Consulta</Tooltip>}
                >
                    <span className='ms-2' style={{ cursor: 'pointer' }}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>

            <Form onSubmit={handleSubmit}>

                <Form.Group className='mb-3'>
                    <Form.Label>Paciente</Form.Label>
                    <Form.Control
                        type='text'
                        required
                        value={consulta.paciente}
                        onChange={(e) => setConsulta({ ...consulta, paciente: e.target.value })}
                    />
                    {/* <Form.Select
                        className="form-control" //esse
                        id="paciente"
                        name="paciente"
                        value={consulta.paciente}
                        onChange={e => setConsulta({ ...consulta, paciente: e.target.value })}
                        required
                    >
                        <option value="">Selecione um Paciente</option>
                        {pacientes.map(paciente => (
                            <option key={paciente.id} value={paciente.nome}>
                                {paciente.nome}
                            </option>
                        ))}

                    </Form.Select> */}
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Especialidade</Form.Label>
                    {/* <Form.Control
                        type='text'
                        required
                        value={consulta.especialidade}
                        onChange={(e) => setConsulta({ ...consulta, especialidade: e.target.value })}
                    /> */}

                    <Form.Select
                        value={consulta.especialidade}
                        onChange={(e) => setConsulta({ ...consulta, especialidade: e.target.value })}
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

                <Form.Group className='mb-3'>
                    <Form.Label>Médico</Form.Label>
                    <Form.Control
                        type='text'
                        required
                        value={consulta.medico}
                        onChange={(e) => setConsulta({ ...consulta, medico: e.target.value })}
                    />
                    {/* <Form.Select
                        className="form-control"
                        id="medico"
                        name="medico"
                        value={consulta.medico}
                        onChange={e => setConsulta({ ...consulta, medico: e.target.value })}
                        required
                    >
                        <option value="Selecione um Médico">Selecione um Médico</option>
                        {medicos.map(medico => (
                            <option key={medico.id} value={medico.nome}>
                                {medico.nome}
                            </option>
                        ))}


                    </Form.Select> */}
                </Form.Group>

                <Row>
                    <Col md={4}>

                        <Form.Group className='mb-3'>
                            <Form.Label>Horario</Form.Label>
                            {/* <Form.Control
                                type='text'
                                required
                                value={consulta.horario}
                                onChange={(e) => setConsulta({ ...consulta, horario: e.target.value })}
                            /> */}

                            <Form.Select
                                value={consulta.horario}
                                onChange={(e) => setConsulta({ ...consulta, horario: e.target.value })}
                            >
                                <option value="">Selecione um Horário</option>
                                <option value="08:00">08:00</option>
                                <option value="08:30">08:30</option>
                                <option value="09:00">09:00</option>
                                <option value="09:30">09:30</option>
                                <option value="10:00">10:00</option>
                                <option value="10:30">10:30</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="12:30">12:30</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="14:30">14:30</option>

                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>

                        <Form.Group className='mb-3'>
                            <Form.Label>Situação</Form.Label>
                            {/* <Form.Control
                                type='text'
                                required
                                value={consulta.situacao}
                                onChange={(e) => setConsulta({ ...consulta, situacao: e.target.value })}
                            /> */}

                            <Form.Select
                                value={consulta.situacao}
                                onChange={(e) => setConsulta({ ...consulta, situacao: e.target.value })}
                            >
                                <option value="">Selecione Situação</option>
                                <option value="Agendada">Agendada</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Cancelada"> Cancelada</option>
                                <option value="Finalizada"> Finalizada</option>
                            </Form.Select>
                        </Form.Group>

                    </Col>
                </Row>

                <Button className='mt-4' type='submit' variant='success'>
                    {id ? 'Salvar' : 'Agendar'}
                </Button>

            </Form>

            <Modal show={modalAberto} onHide={() => { setModalAberto(false); navigate('/listar-consultas') }}>
                <Modal.Header closeButton>
                    <Modal.Title><FaCheckCircle className='text-success me-2' />
                        Sucesso:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {id ? 'Dados da consulta Editado com Sucesso!!!' : 'Consulta agendada com sucesso!'}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={() => navigate('/listar-consultas')}>
                        Fechar
                    </Button>
                </Modal.Footer>

            </Modal>

        </Container>

    )
}

export default ConsultaForm