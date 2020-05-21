import { combineReducers } from 'redux';

import auth from './auth';
import photo from './photo';
import comment from './comment';

export default combineReducers({
    auth : auth,
    photo : photo,
    comment : comment
});