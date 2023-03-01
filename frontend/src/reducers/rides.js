import { GET_RIDES, ADD_RIDE, DELETE_RIDE, FILTER_RIDES } from '../actions/types';

const initialState = {
    rides: [],
    filteredRides: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_RIDES: 
            return {
                ...state,
                rides: action.payload,
                filteredRides: action.payload
            }
        case FILTER_RIDES:
            console.log(action.payload);
            console.log(state.rides);
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
                filteredRides: state.rides.filter((ride) => ride.id !== Number(action.payload))
            };
        default:
            return state;
    }
}