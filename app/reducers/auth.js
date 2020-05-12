import { LOGIN, SIGNUP, LOGIN_ERROR, SIGNUP_ERROR } from "../actions/types";
  
export default (state=[], action) => {
    switch(action.type) {
        case SIGNUP:      
            return  { 
                ...state, 
                user: action.payload,
                errorMessage: ''
            }  
        case SIGNUP_ERROR:      
            return  { 
                ...state, 
                errorMessage: action.payload,
            }    
        case LOGIN_ERROR:      
            return  { 
                ...state, 
                errorMessage: action.payload,
            }     
        case LOGIN:      
            return  { 
                ...state, 
                user: action.payload,
                isLoggedIn: true,
                errorMessage: ''
            }    
            default:
                return state;
    }
  }
  