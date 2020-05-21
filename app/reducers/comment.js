import { ADD_COMMENT } from "../actions/types";
  
export default (state=[], action) => {
    switch(action.type) {
        case ADD_COMMENT:      
            return  { 
                ...state, 
                comment: action.payload,
            }   
            default:
                return state;
    }
  }
  