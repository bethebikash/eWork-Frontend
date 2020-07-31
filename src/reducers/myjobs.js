import { GET_MYJOBS, MYJOBS_ERROR } from "../actions/types";

const initialState = {
  myjobs: null,
  loading: true
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case GET_MYJOBS:
      return {
        ...state,
        myjobs: payload,
        loading: false
      }
    
    case MYJOBS_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}