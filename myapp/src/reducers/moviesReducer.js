import axios from 'axios';
import { GET_ALL_MOVIES, GET_MOVIE, DELETE_MOVIES, ADD_MOVIES, EDIT_MOVIES, SET_MOVIES } from '../actions/types'

const initialState = {
    allMovies: [],
}

export default function moviesReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_MOVIES:
            console.log('case GET_ALL_MOVIES')

            return {
                ...state,
                allMovies: action.payload
            };
        case DELETE_MOVIES:
            console.log('case DELETE_MOVIE')
            return {
                ...state,
                allMovies: action.payload
            }
        case SET_MOVIES:
            return {
                ...state,
                allMovies: []
            }

        default:
            return state;
    }
}