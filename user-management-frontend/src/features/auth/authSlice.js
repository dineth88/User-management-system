import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        error: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null; // Clear error on successful login
        },
        setError: (state, action) => {
            state.error = action.payload; // Set error for failed actions
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null; // Clear error on logout
        },
    },
});

export const { setCredentials, setError, logout } = authSlice.actions;
export default authSlice.reducer;
