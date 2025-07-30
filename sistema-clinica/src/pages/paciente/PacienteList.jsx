import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PacienteList = () => {

    const [pacientes, setPacientes] = useState([])

    const [modalAberto, setModalAberto] = useState(false)

    const [pacienteSelecionado, setPacienteSelecionado] = useState(null)

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get(`${apiUrl}/pacientes`)
            .then(response => setPacientes(response.data))
            .catch(error => console.error("Erro ao carregar Pacientes: ", error))
    }, [])

    const fecharModal = () => {
        setModalAberto(false)
        setPacienteSelecionado(null)
    }

    const abrirModal = (paciente) => {
        setPacienteSelecionado(paciente)
        setModalAberto(true)
    }

    const removerPaciente = () => {
        axios.delete(`${apiUrl}/pacientes/${pacienteSelecionado.id}`)
            .then(() => {
                setPacientes(prev => prev.filter(f => f.id !== pacienteSelecionado.id))
                fecharModal()
            })
    }

    return (
        <Container className='mt-4'>
            <h2 className='mb-4 d-flex align-items-center'>
                Pacientes Cadastrados
                <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>Visualize, edite ou exclua pacientes</Tooltip>}
                >
                    <span className='ms-2' style={{ cursor: 'pointer' }}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>

            <div className='mb-3'>
                <Button variant='primary' as={Link} to='/cadastrar-paciente'>
                    <FaPlus className='me-2' /> Adicionar Paciente
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Contato</th>
                        <th>Convênio</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        pacientes.map(paciente => (
                            <tr key={paciente.id}>
                                <td>{paciente.nome}</td>
                                <td>{paciente.cpf}</td>
                                <td>{paciente.contato}</td>
                                <td>{paciente.convenio}</td>

                                <td >
                                    <Button
                                        as={Link} to={`/editar-paciente/${paciente.id}`} 
                                        className='me-2'
                                        variant='warning'
                                        size='sm'
                                    >
                                        <FaEdit className='me-1' /> Editar
                                    </Button>

                                    <Button
                                        className='me-2 aling'
                                        variant='danger'
                                        size='sm'
                                        onClick={() => abrirModal(paciente)}
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
                    Tem certeza que deseja excluir o paciente selecionado?: {' '} <strong>{pacienteSelecionado?.nome}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secundary' onClick={fecharModal}>Cancelar</Button>
                    <Button variant='danger' onClick={removerPaciente}>Excluir</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default PacienteList