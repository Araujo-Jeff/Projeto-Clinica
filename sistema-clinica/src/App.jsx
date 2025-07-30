import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import PacienteForm from './pages/paciente/PacienteForm'
import PacienteList from './pages/paciente/PacienteList'
import Inicial from './pages/Inicial'
import MedicoForm from './pages/medico/MedicoForm'
import MedicoList from './pages/medico/MedicoList'
import ConsultaForm from './pages/consulta/ConsultaForm'
import ConsultaList from './pages/consulta/ConsultaList'

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Inicial />} />

        <Route path='/cadastrar-paciente' element={<PacienteForm />} />
        <Route path='/listar-pacientes' element={<PacienteList />} />
        <Route path='/editar-paciente/:id' element={<PacienteForm />} />

        <Route path='/cadastrar-medico' element={<MedicoForm />} />
        <Route path='/listar-medicos' element={<MedicoList />} />
        <Route path='/editar-medico/:id' element={<MedicoForm />} />

        <Route path='/cadastrar-consulta' element={<ConsultaForm />} />
        <Route path='/listar-consultas' element={<ConsultaList />} />
        <Route path='/editar-consulta/:id' element={<ConsultaForm />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App