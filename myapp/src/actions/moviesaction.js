import { GET_ALL_MOVIES, GET_MOVIE, DELETE_MOVIES, ADD_MOVIES, EDIT_MOVIES, SET_MOVIES } from '../actions/types'
import { getAll, deleteItem } from '../components/movies/moviesutils';


export const getAllMovies = () => {
    return async function(dispatch) {
        const response = await getAll();
        dispatch({ type: GET_ALL_MOVIES, payload: response });
    };
}


export const deleteMovie = () => {

    return async function(dispatch) {

        await deleteItem();
        const response = await getAll();
        console.log('delete movie')
        dispatch({ type: DELETE_MOVIES, payload: response });
    };
}

export const setEmptyMoviesState = () => {
    return {
        type: SET_MOVIES
    }
}