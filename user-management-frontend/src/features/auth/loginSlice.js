import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: '',
    errorMessage: '',
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearForm: (state) => {
            state.username = '';
            state.password = '';
            state.errorMessage = '';
        },
    },
});

export const { setUsername, setPassword, setErrorMessage, clearForm } = loginSlice.actions;

export default loginSlice.reducer;
