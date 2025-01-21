import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userData: {
    username: '',
    fullname: '',
    password: '',
    status: '',
    emp_id: '',
    role: '',
  },
  loading: false,
  error: null,
};

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data; // The data to be stored in Redux state
  });

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (userData) => {
    const response = await axios.put(
      'http://127.0.0.1:8000/api/users/me/',
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: {},
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserData.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.userData = action.payload;
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

export default userSlice.reducer;
