import axios from 'axios'
import { GET_MYWORKS, MYWORKS_ERROR } from './types'
import { setAlert } from './alert'

// get jobs by query
export const getMyWorks = (query, id) => async (dispatch) => {
  try {
    const res = await axios.get(`/jobs?${query}=${id}&?sortBy=createdAt:desc`)
    dispatch({
      type: GET_MYWORKS,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: MYWORKS_ERROR,
    })
  }
}
