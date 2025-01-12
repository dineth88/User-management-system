import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearForm: (state) => {
            state.username = '';
            state.password = '';
            state.confirmPassword = '';
            state.errorMessage = '';
        },
    },
});

export const { setUsername, setPassword, setConfirmPassword, setErrorMessage, clearForm } = registerSlice.actions;

export default registerSlice.reducer;
