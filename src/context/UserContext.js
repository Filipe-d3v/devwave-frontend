import { createContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import api from '../utils/api';

const Context = createContext()

function UserProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
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
    navigate('/feed');
  }

  async function register(user) {

    try {
      const data = await api.post('/users/register', user).then((response) => {
        enqueueSnackbar('Cadasro Criado com Sucesso!', {variant: 'success'});
        enqueueSnackbar(response.data.message, { variant: 'success' });
        return response.data
      })
      
      await authUser(data)
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {variant: 'error'})
    }
  }

  async function login(user) {
    try {
      const data = await api.post('/users/login', user).then((response) => {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        return response.data
      })
      await authUser(data)
    } catch (error) {
      enqueueSnackbar(error.response.data.message, {variant: 'error'})
    }
  }

  function logout() {
    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/login')
  }
 

  return <Context.Provider value={{ authenticated, login, register, logout }}>
    {children}
  </Context.Provider>
}

export {Context, UserProvider}