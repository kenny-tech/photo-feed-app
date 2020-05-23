import { ADD_COMMENT, FETCH_COMMENT } from "../actions/types";
  
export default (state=[], action) => {
    switch(action.type) {
        case ADD_COMMENT:      
            return  { 
                ...state, 
                message: action.payload,
            }  
        case FETCH_COMMENT:      
            return  { 
                ...state, 
                comment: action.payload,
            }   
        default:
            return state;
    }
  }
  