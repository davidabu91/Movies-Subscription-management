import axios from 'axios'
import { GET_ALL_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from '../actions/types'


const initialState = {
    allUsers: [],
    loading: false
}


export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
                loading: false
            };
        case DELETE_USER:
            console.log('Reducer-Delete-Item')
            axios.delete('http://localhost:9000/api/users/' + action.payload)
                .then(res => console.log(res))
            return {
                ...state,
                // items: [...action.payload]
                // allUsers: state.users.filter(item => item.id !== action.payload)
            };
        case ADD_USER:
            console.log('Reducer-Add-Item')
            return {
                ...state,
                allUsers: [action.payload, ...state.items]
            }
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}