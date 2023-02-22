import axios from "axios";
import { GET_RIDES, ADD_RIDE } from "./types";

// get rides
export const getRides = () => dispatch => {
    axios.get('/api/ridelist')
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

// add ride NEEDS FIX**********
export const addRide = (ride) => dispatch => {
    axios.post('/api/ridelist', ride)
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