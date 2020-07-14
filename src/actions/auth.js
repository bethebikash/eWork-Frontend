import axios from 'axios'
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types'

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
