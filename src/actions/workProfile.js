import axios from 'axios'
import { GET_WORKPROFILE, WORKPROFILE_ERROR, ADD_WORKPROFILE, EDIT_WORKPROFILE } from './types'
import { setAlert } from './alert'
import { setToggleEWP, setToggleWP, setToggleAWP } from './toggle'

// get work profile of current user
export const getWorkProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/work-profiles/belongs_to/${id}`)
    dispatch({
      type: GET_WORKPROFILE,
      payload: res.data,
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
export const addWorkProfile = (skills, technologies, rate, belongs_to) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  }

  const body = { skills, technologies, rate, belongs_to }
  console.log(body)

  try {
    await axios.post('/work-profiles/', body, config)
    dispatch({
      type: ADD_WORKPROFILE,
    })
    dispatch(getWorkProfile(belongs_to))
    dispatch(setToggleAWP(false))
    dispatch(setToggleWP(true))
    dispatch(setAlert('WorkProfile has been added successfully', 'success'))
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: WORKPROFILE_ERROR,
    })
  }
}

// Edit WorkProfile
export const editWorkProfile = (skills, technologies, rate, belongs_to, wpId) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  }

  const body = { skills, technologies, rate }
  console.log(body)

  try {
    await axios.patch(`/work-profiles/${wpId}`, body, config)
    dispatch({
      type: EDIT_WORKPROFILE,
    })
    dispatch(getWorkProfile(belongs_to))
    dispatch(setToggleEWP(false))
    dispatch(setToggleWP(true))
    dispatch(setAlert('WorkProfile has been updated successfully', 'success'))
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: WORKPROFILE_ERROR,
    })
  }
}