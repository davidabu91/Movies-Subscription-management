import { GET_USERS, LOGIN_LOADING, VALID_USER, UPDATE_USER, LOG_OUT, ADD_USER, LOCKOROPEN_USER } from "../actions/types";

const initialState = {
    // users: [],
    loading: false,
    isLogedIn: false,
    lockuser: false,
    currentUser: {},
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case VALID_USER:
            return {
                ...state,
                loading: false,
                isLogedIn: true,
                currentUser: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                loading: false,
                isLogedIn: true,
                currentUser: action.payload,
            }
            // eslint-disable-next-line no-fallthrough
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true,
            };
        case LOG_OUT:
            return {
                ...state,
                isLogedIn: false,
                currentUser: {},
                lockuser: false
            }
        case LOCKOROPEN_USER:
            return {
                ...state,
                lockuser: action.payload
            }

        case ADD_USER:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload]
            }

        default:
            return state;
    }
}