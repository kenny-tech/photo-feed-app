import { ADD_PHOTO } from "../actions/types";
  
export default (state=[], action) => {
    switch(action.type) {
        case ADD_PHOTO:      
            return  { 
                ...state, 
                response: action.payload,
            }   
            default:
                return state;
    }
  }
  