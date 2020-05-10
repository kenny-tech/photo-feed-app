import axios from 'axios';
import { ADD_PHOTO } from './types';

export const add_photo = (username,caption,posted,url) => async dispatch => {
    axios.post('http://10.0.2.2:3000/photos', {
        username: username,
        caption: caption,
        posted: posted,
        url: url
    })
      .then((response) => {
        console.log(response);
        dispatch({
            type: ADD_PHOTO,
            payload: response.data
        });
      })
      .catch((error) => {
          console.log(error);
      })
}
