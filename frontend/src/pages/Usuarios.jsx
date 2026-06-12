import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/api'
import './Usuarios.css'

const FORM_VACIO = { username: '', password: '', nombre: '', email: '', rol: 'USER' }

function Usuarios({ onLogout }) {
  const [usuarios, setUsuarios] = useState([])
  const [form, setForm] = useState(FORM_VACIO)
  const [editandoId, setEditandoId] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const navigate = useNavigate()

  const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}')

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      const res = await getUsuarios()
      setUsuarios(res.data)
    } catch {
      setError('Error al cargar usuarios')
    }
  }

  const mostrarMensaje = (msg) => {
    setMensaje(msg)
    setTimeout(() => setMensaje(''), 3000)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (editandoId) {
        await updateUsuario(editandoId, form)
        mostrarMensaje('Usuario actualizado correctamente')
      } else {
        await createUsuario(form)
        mostrarMensaje('Usuario creado correctamente')
      }
      setForm(FORM_VACIO)
      setEditandoId(null)
      setMostrarForm(false)
      cargarUsuarios()
    } catch {
      setError('Error al guardar usuario. Verifique los datos.')
    }
  }

  const handleEditar = (u) => {
    setForm({ username: u.username, password: '', nombre: u.nombre, email: u.email, rol: u.rol })
    setEditandoId(u.id)
    setMostrarForm(true)
    setError('')
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Está seguro que desea eliminar este usuario?')) return
    try {
      await deleteUsuario(id)
      mostrarMensaje('Usuario eliminado correctamente')
      cargarUsuarios()
    } catch {
      setError('Error al eliminar usuario')
    }
  }

  const handleNuevo = () => {
    setForm(FORM_VACIO)
    setEditandoId(null)
    setMostrarForm(true)
    setError('')
  }

  const handleCancelar = () => {
    setForm(FORM_VACIO)
    setEditandoId(null)
    setMostrarForm(false)
    setError('')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('usuario')
    onLogout()
    navigate('/')
  }

  return (
    <div className="usuarios-container">
      <header className="header">
        <h1>Sistema Mantenedor de Usuarios</h1>
        <div className="header-right">
          <span>Bienvenido, <strong>{usuario.username}</strong> ({usuario.rol})</span>
          <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </header>

      <main className="main-content">
        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="acciones-top">
          <h2>Listado de Usuarios</h2>
          <button className="btn-primary" onClick={handleNuevo}>+ Nuevo Usuario</button>
        </div>

        {mostrarForm && (
          <div className="form-card">
            <h3>{editandoId ? 'Editar Usuario' : 'Crear Usuario'}</h3>
            <form onSubmit={handleSubmit} className="usuario-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    disabled={!!editandoId}
                    placeholder="Nombre de usuario"
                  />
                </div>
                <div className="form-group">
                  <label>{editandoId ? 'Nueva Contraseña (dejar vacío para no cambiar)' : 'Contraseña'}</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required={!editandoId}
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Nombre completo"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="correo@ejemplo.cl"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Rol</label>
                  <select name="rol" value={form.rol} onChange={handleChange}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editandoId ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" className="btn-secondary" onClick={handleCancelar}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="6" className="sin-datos">No hay usuarios registrados</td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge badge-${u.rol.toLowerCase()}`}>{u.rol}</span></td>
                  <td className="acciones-col">
                    <button className="btn-editar" onClick={() => handleEditar(u)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleEliminar(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default Usuarios
