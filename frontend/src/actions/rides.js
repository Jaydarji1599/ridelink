import axios from "axios";
import { GET_RIDES, ADD_RIDE, EDIT_RIDE, DELETE_RIDE, FILTER_RIDES, GET_PASSENGERS, ADD_PASSENGER, REMOVE_PASSENGER } from "./types";
import {ridePostText, rideEditedText, rideDeletedText, passengerBookedText, passengerRemovedByPassengerText, passengerRemovedByDriverText } from "./text";

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
            ridePostText(ride)
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

    // get the ride data for the text updates
    axios.get(`/api/ridelist/${id}`)
    .then((res) => {
        const rideData = res.data;

        // get passengers to notify
        axios.get(`/api/passengers/?ride=${id}`)
        .then((res) => {
            const phoneNumbers = res.data.map((e) => e.phone);

            // delete ride
            axios.delete(`/api/ridelist/${id}/`, tokenConfig(getState))
            .then((res) => {

                // send texts
                rideDeletedText(rideData, phoneNumbers)

                // complete delete action.
                dispatch({
                    type: DELETE_RIDE,
                    payload: id,
                });
            })
            .catch((err) => console.log(err));
            }
        )
    })
}

export const editRide = (ride) => (dispatch) => {
    axios.put(`api/ridelist/${ride.id}/`, ride)
        .then((res) => {
            rideEditedText(ride);
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

export const addPassenger = (passenger, pUser, ride) => dispatch => {
    axios.post('/api/passengers/', passenger)
    .then((res) => {
        passengerBookedText(passenger, pUser, ride);
        dispatch({
            type: ADD_PASSENGER,
            payload: res.data
        })
    })
    .catch((err) => console.log(err))
}

export const removePassenger = (id, ride, pName, actor) => (dispatch, getState) => {
    // get passenger phone info
    axios.get(`/api/passengers/${id}/`)
    .then((res) => {
        const passengerNumber = res.data.phone;

        // get driver phone info
        axios.get(`/api/contacts/${ride.driver}/`)
        .then((res) => {
            const driverNumber = res.data.phone;

            // remove passenger from backend, send text updates to driver and passenger
            axios.delete(`/api/passengers/${id}/`, tokenConfig(getState))
            .then((res) => {
                if (actor === "passenger") { 
                    passengerRemovedByPassengerText(driverNumber, passengerNumber, ride, pName);
                }
                else if (actor === "driver") {
                    passengerRemovedByDriverText(driverNumber, passengerNumber, ride, pName);
                }
                dispatch({
                    type: REMOVE_PASSENGER,
                    payload: id,
                });
            })
            .catch((err) => console.log(err));
        })
    })
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