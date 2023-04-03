import axios from 'axios';
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    UPDATE_PROFILE,
    UPDATE_FAIL,
    ADD_RATING,
    GET_RATINGS
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
            console.log(err);
            dispatch({
                type: LOGIN_FAIL
            })
        })
};

// REGISTER USER
export const register = ({ username, email, firstName, lastName, password, phone }) => dispatch => {
    // need to check if phone is valid FIRST
    
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

            // used to add contact info to database.
            axios.post(
                '/api/contacts/', 
                {
                    user: res.data.user.id,
                    phone: "+1" + phone
                }, 
                config
            )
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.request.responseText
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

export const updateProfile = ({ username, email, firstName, lastName, pk }) => (dispatch, getState) => {
    const config = tokenConfig(getState);
    const body = JSON.stringify({
        username,
        email,
        first_name: firstName,
        last_name: lastName,
    });
    axios.put(`/api/auth/update/${pk}/`, body, config)
        .then(res => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: UPDATE_FAIL,
                payload: err.response.request.responseText
            })
        })
}

// REVIEW ACITIONS
export const addRating = (review) => dispatch => {
    axios.post('/api/reviews/', review)
    .then((res) => {
        dispatch({
            type: ADD_RATING,
            payload: res.data
        })
    })
    .catch( err => {
        console.log(err);
    })
}
export const getRatings = () => dispatch => {
    axios.get('/api/reviews/')
    .then(res => {
        dispatch({
            type: GET_RATINGS,
            payload: res.data
        })
    })
}