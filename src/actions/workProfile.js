import axios from 'axios'
import { GET_WORKPROFILE, WORKPROFILE_ERROR, ADD_WORKPROFILE } from './types'
import { setAlert } from './alert'

// get work profile of current user
export const getWorkProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/work-profiles/belongs_to/${id}`)
    dispatch({
      type: GET_WORKPROFILE,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: WORKPROFILE_ERROR,
    })
  }
}

// Add WorkProfile
export const addWorkProfile = ({ skills, technologies }) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const body = ({skills, technologies })

  try {
    await axios.post('/work-propiles/', body, config)
    dispatch({
      type: ADD_WORKPROFILE,
    })
    dispatch(getWorkProfile())
    dispatch(setAlert('WorkProfile has been added successfully', 'success'))
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: WORKPROFILE_ERROR
    })
  }
}
