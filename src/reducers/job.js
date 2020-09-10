import { SET_JOB, JOBS_ERROR } from "../actions/types";

const initialState = {
  job: null,
  loading: true
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case SET_JOB:
      return {
        ...state,
        job: payload,
        loading: false
      }
    
    case JOBS_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}