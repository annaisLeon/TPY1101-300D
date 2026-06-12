import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

export const login = (username, password) =>
  axios.post(`${BASE_URL}/auth/login`, { username, password })

export const getUsuarios = () =>
  axios.get(`${BASE_URL}/usuarios`)

export const createUsuario = (data) =>
  axios.post(`${BASE_URL}/usuarios`, data)

export const updateUsuario = (id, data) =>
  axios.put(`${BASE_URL}/usuarios/${id}`, data)

export const deleteUsuario = (id) =>
  axios.delete(`${BASE_URL}/usuarios/${id}`)
