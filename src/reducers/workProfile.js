import { GET_WORKPROFILE, WORKPROFILE_ERROR, ADD_WORKPROFILE, EDIT_WORKPROFILE } from "../actions/types";

const initialState = {
  workProfile: null,
  loading: true
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
    
    case ADD_WORKPROFILE:
    case EDIT_WORKPROFILE:
    case WORKPROFILE_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}