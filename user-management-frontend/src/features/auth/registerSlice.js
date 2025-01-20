import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setFullname: (state, action) => {
            state.fullname = action.payload;
        },
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
            state.fullname = '';
            state.username = '';
            state.password = '';
            state.confirmPassword = '';
            state.errorMessage = '';
        },
    },
});

export const { setFullname, setUsername, setPassword, setConfirmPassword, setErrorMessage, clearForm } = registerSlice.actions;

export default registerSlice.reducer;
