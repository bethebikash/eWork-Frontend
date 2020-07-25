import { SET_TOGGLE_WP, SET_TOGGLE_AWP, SET_TOGGLE_EWP } from './types'

export const setToggleWP = (value) => (dispatch) => {
  dispatch({
    type: SET_TOGGLE_WP,
    payload: value,
  })
}

export const setToggleAWP = (value) => (dispatch) => {
  dispatch({
    type: SET_TOGGLE_AWP,
    payload: value,
  })
}

export const setToggleEWP = (value) => (dispatch) => {
  dispatch({
    type: SET_TOGGLE_EWP,
    payload: value,
  })
}
