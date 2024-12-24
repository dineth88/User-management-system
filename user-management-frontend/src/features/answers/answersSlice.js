import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserAnswers = createAsyncThunk(
    'answers/fetchUserAnswers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/answers/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addAnswer = createAsyncThunk(
    'answers/addAnswer',
    async ({ questionId, text }, { rejectWithValue, getState }) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/answers/',
                { question: questionId, text },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            const question = getState().questions.items.find((q) => q.id === questionId);
            return { ...response.data, question }; // Include the related question
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateAnswer = createAsyncThunk(
    'answers/updateAnswer',
    async ({ answerId, text }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/answers/${answerId}/`,
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return { id: answerId, text };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteAnswer = createAsyncThunk(
    'answers/deleteAnswer',
    async (answerId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/answers/${answerId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return answerId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const answersSlice = createSlice({
    name: 'answers',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAnswers.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addAnswer.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateAnswer.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index].text = action.payload.text;
                }
            })
            .addCase(deleteAnswer.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default answersSlice.reducer;
