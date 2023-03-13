import axios from "axios";
import { GET_RIDES, ADD_RIDE, EDIT_RIDE, DELETE_RIDE, FILTER_RIDES, GET_PASSENGERS, ADD_PASSENGER, REMOVE_PASSENGER } from "./types";

// get rides
export const getRides = () => dispatch => {
    axios.get('/api/ridelist/')
        .then(res => {
            dispatch({
                type: GET_RIDES,
                payload: res.data
            })
        })
        .catch( err => {
            console.log(err);
        })
}

export const filterRides = (criteria) => dispatch => {
    dispatch({
        type: FILTER_RIDES,
        payload: criteria
    })
}

export const addRide = (ride) => dispatch => {
    axios.post('/api/ridelist/', ride)
        .then(res => {
            dispatch({
                type: ADD_RIDE,
                payload: res.data
            })
        })
        .catch( err => {
            console.log(err);
        })
}

export const deleteRide = (id) => (dispatch, getState) => {
    axios.delete(`/api/ridelist/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_RIDE,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
}

export const editRide = (ride) => (dispatch) => {
    axios.put(`api/ridelist/${ride.id}/`, ride)
        .then((res) => {
            dispatch({
                type: EDIT_RIDE,
                payload: res.data
            })
        })
}

// get rides
export const getPassengers = () => dispatch => {
    axios.get('/api/passengers/')
        .then(res => {
            dispatch({
                type: GET_PASSENGERS,
                payload: res.data
            })
        })
        .catch( err => {
            console.log(err);
        })
}

export const addPassenger = (passenger) => dispatch => {
    axios.post('/api/passengers/', passenger)
    .then((res) => {
        dispatch({
            type: ADD_PASSENGER,
            payload: res.data
        })
    })
    .catch((err) => console.log(err))
}

export const removePassenger = (id) => (dispatch, getState) => {
    axios.delete(`/api/passengers/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: REMOVE_PASSENGER,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
}


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