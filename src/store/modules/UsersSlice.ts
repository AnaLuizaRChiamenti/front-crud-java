import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../service';
import taskType from '../../types/taskType';

interface usersState {
    users: taskType[];
}
const initialState: usersState = {
    users: []
};

export const getUsersAsyncThunk = createAsyncThunk('getUsers', async () => {
    const response = await api.get('/users');
    return response.data;
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers(builder) {
        builder.addCase(getUsersAsyncThunk.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    },

    reducers: {}
});

export default usersSlice.reducer;
