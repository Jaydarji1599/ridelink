import { GET_RIDES, ADD_RIDE, DELETE_RIDE, FILTER_RIDES, GET_PASSENGERS, ADD_PASSENGER, EDIT_RIDE, REMOVE_PASSENGER } from '../actions/types';

const initialState = {
    rides: [],
    filteredRides: [],
    passengers: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_RIDES: 
            return {
                ...state,
                rides: action.payload,
                filteredRides: action.payload
            }
        case GET_PASSENGERS:
            return {
                ...state,
                passengers: action.payload
            }
        case ADD_PASSENGER:
            return {
                ...state,
                passengers: [...state.passengers, action.payload]
            }
        case REMOVE_PASSENGER:
            return {
                ...state,
                passengers: state.passengers.filter((passenger) => passenger.id !== Number(action.payload))
            }
        case FILTER_RIDES:
            return {
                ...state,
                filteredRides: state.rides.filter(function(ride) {
                    if (ride.source === action.payload.source && ride.destination === action.payload.destination) {
                        if (Date.parse(ride.date) >= Date.parse(action.payload.startDate) &&
                            Date.parse(ride.date) <= Date.parse(action.payload.endDate)
                        ) { 
                            return true;
                        }
                        else if (action.payload.startDate === "" && action.payload.startDate === "") { 
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                })
            };
        case ADD_RIDE:
            return {
                ...state,
                rides: [...state.rides, action.payload],
                filteredRides: [...state.rides, action.payload]
            }
        case DELETE_RIDE:
            return {
                ...state,
                rides: state.rides.filter((ride) => ride.id !== Number(action.payload)),
                filteredRides: state.rides.filter((ride) => ride.id !== Number(action.payload)),
                passengers: state.passengers.filter((passenger) => passenger.ride !== Number(action.payload))
            };
        case EDIT_RIDE: 
            return {
            ...state,
            rides: [...state.rides.filter((ride) => ride.id !== Number(action.payload.id)), action.payload],
            filteredRides: [...state.rides.filter((ride) => ride.id !== Number(action.payload.id)), action.payload]
            };
        default:
            return state;
    }
}