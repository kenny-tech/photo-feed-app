import { LOGIN, SIGNUP } from "../actions/types";
  
export default (state=[], action) => {
    switch(action.type) {
        case SIGNUP:      
            return  { 
                ...state, 
                response: action.payload,
            }    
        case LOGIN:      
            return  { 
                ...state, 
                response: action.payload,
                isLoggedIn: true
            }    
            default:
                return state;
    }
  }
  