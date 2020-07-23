import axios from 'axios'
import { GET_TECHNOLOGIES, TECHNOLOGIES_ERROR } from './types'
import { setAlert } from './alert'

// get skills
export const getTechnologies = () => async (dispatch) => {
  try {
    const res = await axios.get(`/technologies/`)
    dispatch({
      type: GET_TECHNOLOGIES,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: TECHNOLOGIES_ERROR,
    })
  }
}