import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/tasks/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token'); // Assuming you're storing the token in localStorage
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_BASE_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData, thunkAPI) => {
    try {
        const response = await axios.post(API_BASE_URL, taskData, getAuthHeaders());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (taskData, thunkAPI) => {
    try {
        const response = await axios.put(`${API_BASE_URL}${taskData.id}/`, taskData, getAuthHeaders());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, thunkAPI) => {
    try {
        await axios.delete(`${API_BASE_URL}${taskId}/`, getAuthHeaders());
        return taskId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
