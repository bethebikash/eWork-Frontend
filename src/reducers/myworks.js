import { GET_MYWORKS, MYWORKS_ERROR } from "../actions/types";

const initialState = {
  myworks: null,
  loading: true
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case GET_MYWORKS:
      return {
        ...state,
        myworks: payload,
        loading: false
      }
    
    case MYWORKS_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}