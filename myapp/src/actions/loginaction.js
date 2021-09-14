import { GET_USERS, LOGIN_LOADING, VALID_USER, UPDATE_USER, LOG_OUT, ADD_USER, LOCKOROPEN_USER } from './types';
import axios from 'axios';

const herukoUrl = "https://cinema-ws.herokuapp.com/api/auth"

export const getUsers = () => dispatch => {
    dispatch(setLoginLoading());
    axios.get(herukoUrl || 'http://localhost:9000/api/auth')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
            }))
}

export const validUser = obj => {

    return {
        type: VALID_USER,
        payload: obj
    }

}

export const updateUser = (id, obj) => dispatch => {
    dispatch(setLoginLoading());
    axios.put(herukoUrl || 'http://localhost:9000/api/auth', id, obj)
        .then(res =>
            dispatch({
                type: UPDATE_USER,
                payload: obj
            })
        )
}

export const addUser = (obj) => dispatch => {
    dispatch(setLoginLoading());
    axios.post(herukoUrl || 'http://localhost:9000/api/auth', obj)
        .then(res => dispatch({
            type: ADD_USER,
            payload: obj
        }))
}


export const setLoginLoading = () => {
    return {
        type: LOGIN_LOADING
    };
}


export const logout = () => {
    return {
        type: LOG_OUT,
    }
}

export const lockoropenuser = (session, Boolean) => dispatch => {
    setTimeout(() => {
        dispatch({
            type: LOCKOROPEN_USER,
            payload: Boolean
        })
    }, session);

}

export const unlockUser = () => {
    return {
        type: LOCKOROPEN_USER,
        payload: false
    }
}

export const timer = (Boolean) => {
    return {
        type: LOCKOROPEN_USER,
        payload: Boolean
    }
}