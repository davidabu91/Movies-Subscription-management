import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import loginReducer from './loginReducer';
import moviesReduser from './moviesReducer'

export default combineReducers({
    users: usersReducer,
    auth: loginReducer,
    movies: moviesReduser
})