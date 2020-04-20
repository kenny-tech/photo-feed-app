import { LOGIN } from "../actions/types";
  
export default (state=[], action) => {
    switch(action.type) {
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
  