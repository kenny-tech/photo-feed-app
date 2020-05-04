import axios from 'axios';
import { SIGNUP, LOGIN } from './types';

export const signup = (email, pass) => async dispatch => {
    axios.post('http://10.0.2.2:3000/signup', {
        email: email,
        password: pass
      })
      .then((response) => {
        console.log(response);
        dispatch({
            type: SIGNUP,
            payload: response.data
        });
      })
      .catch((error) => {
          console.log(error);
        // dispatch({
        //   type: MAKE_PAYMENT,
        //   payload: error
        // })
      })
}

export const login = (email, pass) => {
    return {
        type: LOGIN,
        payload: {
            email
        }
    }
}