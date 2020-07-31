import { GET_BIDS, BIDS_ERROR } from "../actions/types";

const initialState = {
  bids: null,
  loading: true
}

export default function(state= initialState, action){
  const {type, payload}= action;

  switch (type) {
    case GET_BIDS:
      return {
        ...state,
        bids: payload,
        loading: false
      }
    
    case BIDS_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}