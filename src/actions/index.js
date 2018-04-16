import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
    AUTH_USER, 
    UNAUTH_USER, 
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http//localhost:3090';

export const signinUser = ({ email, password }) => 
    (dispatch) => {
    // Submit email/password
    axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
            // If request is good...
            // - Update state to indicate user is auth'd
            dispatch({ type: AUTH_USER });
            // - Save JWT
            localStorage.setItem('token', response.data.token);
            // - redirect to the rout /feature
            browserHistory.push('/feature');
        })
        .catch(() => {
            // If request is bad...
            // - Show an error to the user
            dispatch(authError('Bad login info!'));
        });
    }

export const signupUser = ({ email, password }) => 
    (dispatch) => {
    // Submit email/password
    axios.post(`${ROOT_URL}/signup`, { email, password })
        .then(response => {
            // If request is good...
            // - Update state to indicate user is auth'd
            dispatch({ type: AUTH_USER });
            // - Save JWT
            localStorage.setItem('token', response.data.token);
            // - redirect to the rout /feature
            browserHistory.push('/feature');
        })
        .catch(error => {
            // If request is bad...
            // - Show an error to the user
            dispatch(authError(`${error}`));
        });
    }

export const authError = (error) => ({
    type: AUTH_ERROR,
    payload: error
})

export const signoutUser = () => {
    localStorage.removeItem('token');
    
    return {
        type: UNAUTH_USER
    };
};

export const fetchMessage = () => 
    (dispatch) => {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    }
