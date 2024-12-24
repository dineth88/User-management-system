import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import questionsReducer from './features/questions/questionsSlice';
import answersReducer from './features/answers/answersSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        questions: questionsReducer,
        answers: answersReducer,
    },
});