import axios from 'axios'
import { setAlert } from './alert'
import setAuthToken from './setAuthToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER, AUTH_ERROR, LOGOUT } from './types'

//Load User Data
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/users/me')
    dispatch({
      type: LOAD_USER,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// User Register
export const register = ({ name, username, address, phone, email, password, role }) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const body = ({name, username, address, phone, email, password, role })

  try {
    const res = await axios.post('/users/register', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'danger'))
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// User Login
export const login = ({ username, password }) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }
  const body = { username, password }

  try {
    const res = await axios.post(
      '/users/login',
      body,
      config
    )

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'danger'))
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  })
  // dispatch({
  //   type: CLEAR_MYBOOKINGS
  // })
}
