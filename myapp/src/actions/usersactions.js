import { GET_ALL_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from './types'
import axios from 'axios';

export const getAllUsers = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('http://localhost:9000/api/users')
        .then(res => {
            let users = res.data.sort((a, b) => a.index - b.index)

            dispatch({
                type: GET_ALL_USERS,
                payload: users
            });
        })
}


export const deleteUsers = (id) => dispatch => {
    console.log('action-Delete-Item')
        // dispatch({
        //     type: DELETE_USER,
        //     payload: id
        // })
    return {
        type: DELETE_USER,
        payload: id
    }
}


export const addUsers = item => dispatch => {
    axios
        .post('http://localhost:9000/api/users', item)
        .then(res => dispatch({
            type: ADD_USER,
            payload: res.data
        }))
}

export const setItemsLoading = () => {
    return {
        type: USERS_LOADING,
    };
}