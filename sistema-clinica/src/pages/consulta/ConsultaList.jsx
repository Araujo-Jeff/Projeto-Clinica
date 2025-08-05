import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ConsultaList = () => {

    const [consultas, setConsultas] = useState([])

    const [modalAberto, setModalAberto] = useState(false)

    const [consultaSelecionada, setConsultaSelecionada] = useState(null)

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get(`${apiUrl}/consultas`)
            .then(response => setConsultas(response.data))
            .catch(error => console.error("Erro ao carregar consultas: ", error))
    }, [])

    const fecharModal = () => {
        setModalAberto(false)
        setConsultaSelecionada(null)
    }

    const abrirModal = (consulta) => {
        setConsultaSelecionada(consulta)
        setModalAberto(true)
    }

    const removerConsulta = () => {
        axios.delete(`${apiUrl}/consultas/${consultaSelecionada.id}`)
            .then(() => {
                setConsultas(prev => prev.filter(f => f.id !== consultaSelecionada.id))
                fecharModal()
            })
    }

    return (
        <Container className='mt-4'>
            <h2 className='mb-4 d-flex align-items-center'>
                Lista de Agendamento
                <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>Visualize, edite ou exclua Consultas</Tooltip>}
                >
                    <span className='ms-2' style={{ cursor: 'pointer' }}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>

            <div className='mb-3'>
                <Button variant='primary' as={Link} to='/cadastrar-consulta'>
                    <FaPlus className='me-2' /> Agendar Consulta
                </Button>
            </div>


            <Table striped bordered hover responsive>

                <thead>
                    <tr>
                        <th>Paciente</th>
                        <th>Médico</th>
                        <th>Horario</th>
                        <th>Situação</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        consultas.map(consulta => (
                            <tr key={consulta.id}>
                                <td>{consulta.paciente}</td>
                                <td>{consulta.medico}</td>
                                <td>{consulta.horario}</td>
                                <td>{consulta.situacao}</td>
                                <td>
                                    <Button
                                        as={Link} to={`/editar-consulta/${consulta.id}`}
                                        className='me-2'
                                        variant='warning'
                                        size='sm'
                                    >
                                        <FaEdit className='me-1' /> Editar
                                    </Button>

                                    <Button
                                        className='me-2'
                                        variant='danger'
                                        size='sm'
                                        onClick={() => abrirModal(consulta)}
                                    >
                                        <FaTrash className='me-1' /> Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </Table>

            <Modal show={modalAberto} onHide={fecharModal} centered>
                <Modal.Header>

                    <Modal.Title>
                        <FaExclamationTriangle className='text-danger me-2' />
                        Confirmar exclusão
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Tem certeza que deseja excluir o agendamento?: {' '} <strong>{consultaSelecionada?.paciente?.nome}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={fecharModal}>Cancelar</Button>
                    <Button variant='danger' onClick={removerConsulta}>Excluir</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default ConsultaList