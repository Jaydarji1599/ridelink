import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS 
} from './types';

// check token & load user
export const loadUser = () => (dispatch, getState) => {

    axios.get('api/auth/user/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: AUTH_ERROR
            })
        })
};

// LOG IN THE USER
export const login = (username, password) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get body
    const body = JSON.stringify({
        username,
        password
    })


    axios.post('api/auth/login/', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL
            })
        })
};

// REGISTER USER
export const register = ({ username, email, firstName, lastName, password }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // get body
    const body = JSON.stringify({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
    })
    
    axios.post('api/auth/register/', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: REGISTER_FAIL
            })
        })
};



// LOG OUT USER
export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => {
            dispatch({
                type: LOGOUT_FAIL
            })
        })
};

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}