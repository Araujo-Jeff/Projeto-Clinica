import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { FaEdit, FaExclamationTriangle, FaPlus, FaQuestionCircle, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MedicoList = () => {

    const [medicos, setMedicos] = useState([])

    const [modalAberto, setModalAberto] = useState(false)

    const [medicoSelecionado, setMedicoSelecionado] = useState(null)


    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        axios.get(`${apiUrl}/medicos`)
            .then(response => setMedicos(response.data))
            .catch(error => console.error("Erro ao carregar médicos: ", error))
    }, [])

    const fecharModal = () => {
        setModalAberto(false)
        setMedicoSelecionado(null)
    }

    const abrirModal = (medico) => {
        setMedicoSelecionado(medico)
        setModalAberto(true)
    }

    const removerCliente = () => {
        axios.delete(`${apiUrl}/medicos/${medicoSelecionado.id}`)
            .then(() => {
                setMedicos(prev => prev.filter(f => f.id !== medicoSelecionado.id))
                fecharModal()
            })
    }

    return (
        <Container className='mt-4'>
            <h2 className='mb-4 d-flex align-items-center'>
                Lista de Médicos
                <OverlayTrigger
                    placement='right'
                    overlay={<Tooltip>Visualize, edite ou exclua Médicos</Tooltip>}
                >
                    <span className='ms-2' style={{ cursor: 'pointer' }}>
                        <FaQuestionCircle />
                    </span>
                </OverlayTrigger>
            </h2>

            <div className='mb-3'>
                <Button variant='primary' as={Link} to='/cadastrar-medico'>
                    <FaPlus className='me-2' /> Adicionar Médico
                </Button>
            </div>
           

            <Table striped bordered hover responsive>

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CRM</th>
                        <th>Especialidade</th>
                        <th>Horario</th>
                        <th>Dias de Atendimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        medicos.map(medico => (
                            <tr key={medico.id}>
                                <td>{medico.nome}</td>
                                <td>{medico.crm}</td>
                                <td>{medico.especialidade}</td>
                                <td>{medico.horario}</td>
                                <td>{medico.diasAtendimento}</td>
                                <td>
                                    <Button
                                        as={Link} to={`/editar-medico/${medico.id}`}
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
                                        onClick={() => abrirModal(medico)}
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
                    Tem certeza que deseja excluir o médico selecionado?: {' '} <strong>{medicoSelecionado?.nome}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secundary' onClick={fecharModal}>Cancelar</Button>
                    <Button variant='danger' onClick={removerCliente}>Excluir</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    )
}

export default MedicoList