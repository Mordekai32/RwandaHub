import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Set default Authorization header for all future requests
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me');
        // Ensure user object has 'id' (backend returns '_id' as 'id' in response)
        const userData = res.data;
        if (userData && !userData.id && userData._id) {
          userData.id = userData._id;
        }
        setUser(userData);
        setError(null);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
        setUser(null);
        setError('Session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user: userData } = res.data;
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Ensure user has 'id' field
      if (userData && !userData.id && userData._id) {
        userData.id = userData._id;
      }
      setUser(userData);
      return userData;
    } catch (err) {
      const message = err.response?.data?.error || 'Login failed';
      setError(message);
      throw new Error(message);
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const res = await API.post('/auth/register', userData);
      const { token, user: newUser } = res.data;
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (newUser && !newUser.id && newUser._id) {
        newUser.id = newUser._id;
      }
      setUser(newUser);
      return newUser;
    } catch (err) {
      const message = err.response?.data?.error || 'Registration failed';
      setError(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete API.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isSeller: user?.role === 'seller' || user?.role === 'admin',
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};