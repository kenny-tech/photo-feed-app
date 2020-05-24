import axios from 'axios';
import { ADD_PHOTO, FETCH_USER_PHOTOS } from './types';

import { baseurl } from '../../config/config'

export const add_photo = (userId,caption,posted,base64Image,username) => async dispatch => {
    axios.post(baseurl + '/photos', {
        userId: userId,
        caption: caption,
        posted: posted,
        base64Image: base64Image,
        username: username
    })
      .then((response) => {
        // console.log(response);
        dispatch({
            type: ADD_PHOTO,
            payload: response.data
        });
      })
      .catch((error) => {
          console.log(error.response);
      })
}

