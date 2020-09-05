import axios from 'axios'
import { GET_JOBS, JOBS_ERROR } from './types'
import { setAlert } from './alert'

// get jobs
export const getJobs = () => async (dispatch) => {
  try {
    const res = await axios.get(`/jobs?status=available?sortBy=createdAt:desc`)
    dispatch({
      type: GET_JOBS,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: JOBS_ERROR,
    })
  }
}