import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
    else setLoading(false)
  }, [])

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/profile')
      setUser(res.data.user)
    } catch (error) {
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const res = await api.post('/api/login', { email, password })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    setUser(user)
    return user
  }

  const register = async (userData) => {
    const res = await api.post('/api/register', userData)
    const { token, user } = res.data
    localStorage.setItem('token', token)
    setUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}