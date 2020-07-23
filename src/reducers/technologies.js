import { GET_TECHNOLOGIES, TECHNOLOGIES_ERROR } from "../actions/types";

const initialState = {
  technologies: null,
  loading: true
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case GET_TECHNOLOGIES:
      return {
        ...state,
        technologies: payload,
        loading: false
      }
    
    case TECHNOLOGIES_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}