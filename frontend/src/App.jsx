import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Usuarios from './pages/Usuarios'

function App() {
  const [logueado, setLogueado] = useState(!!sessionStorage.getItem('usuario'))

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={() => setLogueado(true)} />} />
      <Route
        path="/usuarios"
        element={logueado ? <Usuarios onLogout={() => setLogueado(false)} /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default App
