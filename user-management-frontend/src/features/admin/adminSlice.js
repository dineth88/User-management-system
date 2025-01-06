import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/users/";

const token = localStorage.getItem("token");
const authHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// Thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_BASE_URL, authHeaders);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for updating user
export const updateUser = createAsyncThunk("users/updateUser", async (userData, thunkAPI) => {
  const { id, ...updatedFields } = userData;
  try {
    const response = await axios.put(`${API_BASE_URL}${id}/`, updatedFields, authHeaders);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for deleting user
export const deleteUser = createAsyncThunk("users/deleteUser", async (id, thunkAPI) => {
  try {
    await axios.delete(`${API_BASE_URL}${id}/`, authHeaders);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        state.data = state.data.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUserId = action.payload;
        state.data = state.data.filter((user) => user.id !== deletedUserId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
