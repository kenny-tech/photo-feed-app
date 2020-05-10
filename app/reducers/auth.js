import { LOGIN, SIGNUP } from "../actions/types";
  
export default (state=[], action) => {
    switch(action.type) {
        case SIGNUP:      
            return  { 
                ...state, 
                user: action.payload,
            }    
        case LOGIN:      
            return  { 
                ...state, 
                user: action.payload,
                isLoggedIn: true
            }    
            default:
                return state;
    }
  }
  