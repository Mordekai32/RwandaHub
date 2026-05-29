// api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor: add auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('[Axios Request Error]', error)
    return Promise.reject(error)
  }
)

// Response interceptor: handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized – token expired or invalid
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user') // if you store user data
      window.location.href = '/login'
    }

    // Handle 403 Forbidden – insufficient permissions
    if (error.response?.status === 403) {
      console.warn('Access forbidden:', error.response?.data?.message)
      // Optionally redirect to a "not authorized" page
    }

    // Handle network errors
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.error('Network error or timeout:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api