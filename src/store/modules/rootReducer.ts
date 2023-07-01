import { combineReducers } from '@reduxjs/toolkit';
import UsersSlice from './UsersSlice';
import { userLoggedReducer } from './userLogged';

export default combineReducers({
    users: UsersSlice,
    userLogged: userLoggedReducer
});
