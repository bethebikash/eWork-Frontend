import axios from 'axios'
import { GET_BIDS, BIDS_ERROR } from './types'
import { setAlert } from './alert'

// get jobs
export const getBids = (query, id) => async (dispatch) => {
  try {
    const res = await axios.get(`/bids?${query}=${id}`)
    dispatch({
      type: GET_BIDS,
      payload: res.data
    })
  } catch (error) {
    const err = error.response.data.error.message
    dispatch(setAlert(err, 'error'))
    dispatch({
      type: BIDS_ERROR,
    })
  }
}