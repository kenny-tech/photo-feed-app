import axios from 'axios';
import { ADD_COMMENT, FETCH_COMMENT } from './types';

import { baseurl } from '../../config/config'

export const add_comment = (photoId,username,posted,comment) => async dispatch => {
    axios.post(baseurl + '/comments', {
        photoId: photoId,
        username: username,
        posted: posted,
        comment: comment,
    })
      .then((response) => {
        // console.log('Comment: ', response.data.message);
        dispatch({
            type: ADD_COMMENT,
            payload: response.data.message
        });
      })
      .catch((error) => {
          console.log(error.response);
      })
}

export const fetch_comment = (photoId) => async dispatch => {
    axios.get(baseurl + '/comments/' + photoId)
      .then((response) => {
        // console.log('Comments 111: ',response.data);
        dispatch({
            type: FETCH_COMMENT,
            payload: response.data.data
        });
      })
      .catch((error) => {
          console.log(error.response);
      })
}

