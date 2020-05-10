import axios from 'axios';
import { ADD_PHOTO } from './types';

export const add_photo = (userId,username,caption,posted,base64Image) => async dispatch => {
    axios.post('http://10.0.2.2:3000/photos', {
        userId: userId,
        username: username,
        caption: caption,
        posted: posted,
        base64Image: base64Image
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
