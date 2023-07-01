import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import userType from '../../types/userType';
import api from '../../service';
import axios, { AxiosError } from 'axios';

interface userstate {
    user: userType;
}
const initialState: userstate = {
    user: { email: '', password: '', tasks: [] }
};

interface userCreate {
    email: string;
    password: string;
    repassword: string;
}

export const userCreateAsyncThunk = createAsyncThunk(
    'userCreate',
    async ({ email, password, repassword }: userCreate) => {
        try {
            const response = await api.post('/users', {
                email,
                password,
                repassword
            });
            console.log(response);

            return response.data;
        } catch (error) {
            let errorMessage = 'Erro desconhecido';

            if (axios.isAxiosError(error)) {
                if (error.response?.data?.error) {
                    errorMessage = error.response.data.error;
                }
            }

            throw new Error(errorMessage);
        }
    }
);

export const userSlice = createSlice({
    name: 'User',
    initialState,

    reducers: {}
});

export default userSlice.reducer;
