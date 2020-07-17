import axios from 'axios'
import { GET_WORKPROFILE, WORKPROFILE_ERROR } from './types'

// get work profile of current user
export const getWorkProfile = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/work-profiles/belongs_to/${id}`)
    dispatch({
      type: GET_WORKPROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: WORKPROFILE_ERROR,
      payload: { msg: error.response.data.error.message}
    })
  }
}
