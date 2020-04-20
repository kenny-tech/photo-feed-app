import { LOGIN } from './types';

export const login = (email, pass) => {
    return {
        type: LOGIN,
        payload: {
            email
        }
    }
}