import { LOGIN, SIGNUP, LOGIN_ERROR, SIGNUP_ERROR, UPDATE_PROFILE, LOGOUT } from "../actions/types";
  
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
        case UPDATE_PROFILE:      
            return  { 
                ...state, 
                user: action.payload,
                errorMessage: ''
            }   
        case LOGOUT:
            return {
                state: []
            }    
            default:
                return state;
    }
  }
  