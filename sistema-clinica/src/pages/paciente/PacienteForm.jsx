import React, { useEffect, useState } from 'react'
import { Col, Container, Form, OverlayTrigger, Row, Tooltip, Button, Modal } from 'react-bootstrap'
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const PacienteForm = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL

    const [modalAberto, setModalAberto] = useState(false)

    const [paciente, setPaciente] = useState({
        nome: '',
        dataNascimento: '',
        cpf: '',
        contato: '',
        alergia: '',
        tipoSanguineo: '',
        convenio: '',
        endereco: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            pais: 'Brasil'
        }
    })


    const handleEndereco = (campo, valor) => {
        setPaciente((prev) => ({
            ...prev,
            endereco: { ...prev.endereco, [campo]: valor }
        }))
    }


    const handleCepChange = (e) => {
        handleEndereco('cep', e.target.value)
    }

    useEffect(() => {
        axios.get(`${apiUrl}/pacientes/${id}`)
            .then(response => setPaciente(response.data))
            .catch(error => console.error('Houve um erro ao carregar paciente: ', error))
    }, [id])

    useEffect(() => {
        const cep = paciente.endereco.cep.replace(/\D/g, '')
        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    handleEndereco('logradouro', response.data.logradouro)
                    handleEndereco('bairro', response.data.bairro)
                    handleEndereco('cidade', response.data.localidade)
                    handleEndereco('estado', response.data.estado)
                })
                .catch(error => console.error("Houve um erro ao buscar o endereço no viacep: ", error))
        }
    }, [paciente.endereco.cep])


    const handleSubmit = (e) => {
        e.preventDefault()

        const pacienteData = {
            ...paciente,
            cpf: paciente.cpf.replace(/[^\d]/g, '')
        }

        const request = id
            ? axios.put(`${apiUrl}/pacientes/${id}`, pacienteData)
            : axios.post(`${apiUrl}/pacientes`, pacienteData)

        request.then(() => setModalAberto(true))
            .catch(error => console.error('Error ao cadastrar/editar Paciente: ', error))

    }


    return (
        <Container className='mt-4'>
            <h2 className='mb-4 d-flex align-items center'>
                {id ? 'Editar Paciente' : 'Adicionar Paciente'}
                <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>Preencha os dados do paciente</Tooltip>}
                >
                    <span className='ms-2' style={{ cursor: 'pointer' }}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>
            <hr />
            <h5>Dados Pessoais</h5>
            <hr />

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className='mb3'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={paciente.nome}
                                onChange={(e) => setPaciente({ ...paciente, 'nome': e.target.value })}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group className='mb3'>
                            <Form.Label>Nascimento</Form.Label>
                            <Form.Control
                                type='date'
                                required
                                value={paciente.dataNascimento}
                                onChange={(e) => setPaciente({ ...paciente, 'dataNascimento': e.target.value })}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group className='mb3'>
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={paciente.cpf}
                                onChange={(e) => setPaciente({ ...paciente, 'cpf': e.target.value })}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group className='mb3'>
                            <Form.Label>Contato</Form.Label>
                            <Form.Control
                                type='tel'
                                placeholder='(XX) XXXXX-XXXX'
                                required
                                value={paciente.contato}
                                onChange={(e) => setPaciente({ ...paciente, 'contato': e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Alergia</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                value={paciente.alergia}
                                onChange={(e) => setPaciente({ ...paciente, 'alergia': e.target.value })}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={2}>
                        <Form.Group>
                            <Form.Label>Tipo Sanguineo</Form.Label>
                            {/* <Form.Control
                                type='text'
                                required
                                value={paciente.tipoSanguineo}
                                onChange={(e) => setPaciente({ ...paciente, 'tipoSanguineo': e.target.value })}
                            >
                            </Form.Control> */}

                            <Form.Select
                                value={paciente.tipoSanguineo}
                                onChange={(e) => setPaciente({ ...paciente, 'tipoSanguineo': e.target.value })}
                            >
                                <option value="Selecione">Selecione...</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>

                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Convenio</Form.Label>
                            {/* <Form.Control
                                type='text'
                                required
                                value={paciente.convenio}
                                onChange={(e) => setPaciente({ ...paciente, 'convenio': e.target.value })}
                            >
                            </Form.Control> */}
                            <Form.Select
                                value={paciente.convenio}
                                onChange={(e) => setPaciente({ ...paciente, 'convenio': e.target.value })}
                            >
                                <option value="Selecione">Selecione...</option>
                                <option value="Amil">Amil</option>
                                <option value="Bradesco Saude">Bradesco Saúde</option>
                                <option value="SulAmerica">SulAmérica</option>
                                <option value="Unimed">Unimed</option>
                                <option value="Hapvida">Hapvida</option>
                                <option value="Outros">Outros</option>

                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <hr />
                <h5>Endereço</h5>
                <hr />
                <Row>
                    <Col md={4}>
                        <Form.Group className='mb-3'>
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ex: 58000-000'
                                value={paciente.endereco.cep}
                                onChange={handleCepChange}
                                autoComplete='off'
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={8}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control
                                type='text'
                                value={paciente.endereco.logradouro}
                                onChange={e => handleEndereco('logradouro', e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={4}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type='text'
                                value={paciente.endereco.numero}
                                onChange={e => handleEndereco('numero', e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={8}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                                type='text'
                                value={paciente.endereco.complemento}
                                onChange={e => handleEndereco('complemento', e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                type='text'
                                value={paciente.endereco.bairro}
                                onChange={e => handleEndereco('bairro', e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type='text'
                                value={paciente.endereco.cidade}
                                onChange={e => handleEndereco('cidade', e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                type='text'
                                value={paciente.endereco.estado}
                                onChange={e => handleEndereco('estado', e.target.value)}
                                required
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label>País</Form.Label>
                            <Form.Control
                                type='text'
                                value={paciente.endereco.pais}
                                onChange={e => handleEndereco('pais', e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type='submit' variant='success'>
                    {id ? 'Salvar' : 'Adicionar'}
                </Button>
            </Form>

            <Modal show={modalAberto} onHide={() => { setModalAberto(false); navigate('/listar-pacientes') }}>

                <Modal.Header closeButton>
                    <Modal.Title><FaCheckCircle className='text-success me-2' />
                        Sucesso:
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {id ? 'Dados do Paciente Editado com Sucesso!!!' : 'Paciente adicionado com sucesso!'}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='success' onClick={() => navigate('/listar-pacientes')}>
                        Fechar
                    </Button>
                </Modal.Footer>

            </Modal>

        </Container>
    )
}

export default PacienteForm