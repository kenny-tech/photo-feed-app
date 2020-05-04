import { LOGIN } from './types';
import { SIGNUP } from './types';

export const signup = (email, pass) => {
    return {
        type: LOGIN,
        payload: {
            email
        }
    }
}

export const login = (email, pass) => {
    return {
        type: LOGIN,
        payload: {
            email
        }
    }
}