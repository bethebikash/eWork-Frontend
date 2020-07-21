import { GET_WORKPROFILE, WORKPROFILE_ERROR } from "../actions/types";

const initialState = {
  workProfile: null,
  loading: true,
  error: {}
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case GET_WORKPROFILE:
      return {
        ...state,
        workProfile: payload,
        loading: false
      }
    case WORKPROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}