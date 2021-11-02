import { GET_ALL_USERS, ADD_USER, DELETE_USER, USERS_LOADING, SET_USERS } from './types'
import axios from 'axios';

const herukoUrl = "https://cinema-ws.herokuapp.com/api/users"

export const getAllUsers = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get(herukoUrl || 'http://localhost:9000/api/users')
        .then(res => {
            let users = res.data.sort((a, b) => a.index - b.index)

            dispatch({
                type: GET_ALL_USERS,
                payload: users
            });
        })
}


export const deleteUsers = (id) => dispatch => {

    return {
        type: DELETE_USER,
        payload: id
    }
}


export const addUsers = item => dispatch => {
    axios
        .post(herukoUrl || 'http://localhost:9000/api/users', item)
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

export const setEmptyUsersState = () => {
    return {
        type: SET_USERS
    }
}