import { GET_JOBS, JOBS_ERROR } from "../actions/types";

const initialState = {
  jobs: null,
  loading: true
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: payload,
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