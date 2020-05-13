import axios from 'axios';
import { SIGNUP, LOGIN, LOGIN_ERROR, SIGNUP_ERROR } from './types';

import { baseurl } from '../../config/config'

export const signup = (email,pass,name,username) => async dispatch => {
    axios.post(baseurl + '/signup', {
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
          // console.log(error.response);
          dispatch({
            type: SIGNUP_ERROR,
            payload: error.response.data.message
          });
      })
}

export const login = (email, pass)  => async dispatch => {
    axios.post(baseurl + '/signin', {
        email: email,
        password: pass,
      })
      .then((response) => {
        // console.log(response);
        dispatch({
            type: LOGIN,
            payload: response.data
        });
      })
      .catch((error) => {
          // console.log(error.response.data.message);
          dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.message
          });
      })
}