import axios from 'axios';
import { SIGNUP, LOGIN } from './types';

export const signup = (email,pass,name,username) => async dispatch => {
    axios.post('http://10.0.2.2:3000/signup', {
        email: email,
        password: pass,
        name: name,
        username: username
      })
      .then((response) => {
        console.log(response);
        dispatch({
            type: SIGNUP,
            payload: response.data
        });
      })
      .catch((error) => {
          console.log(error.response);
      })
}

export const login = (email, pass)  => async dispatch => {
    axios.post('http://10.0.2.2:3000/signin', {
        email: email,
        password: pass,
      })
      .then((response) => {
        console.log(response);
        dispatch({
            type: LOGIN,
            payload: response.data
        });
      })
      .catch((error) => {
          console.log(error.response);
      })
}