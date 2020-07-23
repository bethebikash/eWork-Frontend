import { GET_SKILLS, SKILLS_ERROR } from "../actions/types";

const initialState = {
  skills: null,
  loading: true
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case GET_SKILLS:
      return {
        ...state,
        skills: payload,
        loading: false
      }
    
    case SKILLS_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}