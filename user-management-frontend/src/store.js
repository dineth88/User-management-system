import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import adminReducer from './features/admin/adminSlice';
import userReducer from './features/user/userSlice'; 
import registerReducer from './features/auth/registerSlice'; 
import loginReducer from './features/auth/loginSlice'; 


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        users: adminReducer, // Add userSlice reducer
        register: registerReducer, // Register userSlice
        login: loginReducer, // Login userSlice
    },
});
