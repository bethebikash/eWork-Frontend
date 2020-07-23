import axios from 'axios'
import { GET_SKILLS, SKILLS_ERROR } from './types'
import { setAlert } from './alert'

// get skills
export const getSkills = () => async (dispatch) => {
  try {
    const res = await axios.get(`/skills`)
    dispatch({
      type: GET_SKILLS,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: SKILLS_ERROR,
    })
  }
}