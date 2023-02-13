import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetcher } from '../../api/api';


export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (data, { rejectWithValue }) => {
    try {
      return await fetcher('register', { method: 'POST', body: data });
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (data, { rejectWithValue }) => {
    try {
      return await fetcher('login', { method: 'POST', body: data });
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);


const initialState = {
  id: null,
  token: localStorage.getItem('my-token'),
  status: null,
  error: null,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      localStorage.setItem('my-token', action.payload.token);
    },

    setLogout: (state) => {
      state.id = null;
      state.token = null;
      localStorage.removeItem('my-token');
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem('my-token', action.payload.token);
    },
    [fetchRegister.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.payload;
    },

    [fetchLogin.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.token = action.payload.token;
      state.id = action.payload.id;
      localStorage.setItem('my-token', action.payload.token);
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.payload;
    },

  },
});


export const authActions = authSlice.actions;
export default authSlice.reducer;
