import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    UPDATE_PROFILE,
    UPDATE_FAIL,
    ADD_RATING,
    GET_RATINGS
} from "../actions/types"

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    loginError: false,
    registrationError: false,
    updateError: {
        show: false,
        message: {}
    },
    ratings: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                registrationError: false,
                loginError: false
            }
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                loginError: true
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                registrationError: true
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                registrationError: false,
                loginError: false
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    username: action.payload.username,
                    email: action.payload.email,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name
                },
                updateError: {
                    show: false,
                    message: {}
                },
            }
        case UPDATE_FAIL:
            return {
                ...state,
                updateError: {
                    show: true,
                    message: JSON.parse(action.payload)
                },
            }
        case GET_RATINGS:
            return {
                ...state,
                ratings: action.payload
            }
        case ADD_RATING:
            return {
                ...state,
                ratings: [...state.ratings, action.payload]
            }
        default:
            return state
    }
}