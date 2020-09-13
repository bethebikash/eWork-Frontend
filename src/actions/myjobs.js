import axios from 'axios'
import { GET_MYJOBS, MYJOBS_ERROR } from './types'
import { setAlert } from './alert'

// get jobs by query
export const getMyJobs = (query, id) => async (dispatch) => {
  try {
    const res = await axios.get(`/jobs?${query}=${id}&?sortBy=createdAt:desc`)
    dispatch({
      type: GET_MYJOBS,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: MYJOBS_ERROR,
    })
  }
}
