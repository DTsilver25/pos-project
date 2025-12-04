import axios from 'axios'

const api = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_DB_PORT}`,
})

export default api
