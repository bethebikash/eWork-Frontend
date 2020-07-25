import { SET_TOGGLE_WP, SET_TOGGLE_AWP, SET_TOGGLE_EWP } from '../actions/types'

const initialState = {
  workProfile: true,
  addWorkProfile: false,
  editWorkProfile: false,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case SET_TOGGLE_WP:
      return { ...state, workProfile: payload }
    case SET_TOGGLE_AWP:
      return { ...state, addWorkProfile: payload }
    case SET_TOGGLE_EWP:
      return { ...state, editWorkProfile: payload }
    default:
      return state
  }
}
