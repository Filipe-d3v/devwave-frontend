import { useEffect, useState } from "react";
import api from "../utils/api";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const { snackbar } = useSnackbar();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token));
    navigate('/');
  }

  async function register(user) {

    try {
      const data = await api.post('/users/register', user).then((response) => {
        snackbar(response.data.message, { variant: 'success' })
        return response.data
      })
      
      await authUser(data)
    } catch (error) {
      snackbar(error.response.data.message, { variant: 'error' })
    }
  }

  async function login(user) {
    try {
      const data = await api.post('/users/login', user).then((response) => {
        snackbar(response.data.message, { variant: 'success' })
        return response.data
      })
      await authUser(data)
    } catch (error) {
      snackbar(error.response.data.message, { variant: 'error' })
    }
  }

  function logout() {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/login')
  }

  return (register, login, logout, authenticated);
}