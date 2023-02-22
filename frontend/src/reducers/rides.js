import { GET_RIDES, ADD_RIDE } from '../actions/types';

const initialState = {
    rides: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_RIDES: 
            return {
                ...state,
                rides: action.payload
            }
        case ADD_RIDE:
            return {
                ...state,
                rides: [...state.rides, action.payload]
            }
        default:
            return state;
    }
}