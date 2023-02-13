import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetcher } from '../../api/api';


export const fetchGetUsers = createAsyncThunk(
  'user/fetchGetUsers',
  async (data, { rejectWithValue }) => {
    try {
      return await fetcher('users', data);
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);


export const fetchGetUserItem = createAsyncThunk(
  'user/fetchGetUserItem',
  async (id, { rejectWithValue }) => {
    try {
      return await fetcher('users/' + id);
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);


export const fetchPutUserItem = createAsyncThunk(
  'user/fetchPutUserItem',
  async (data, { rejectWithValue }) => {
    try {
      return await fetcher('users/' + data.id, { method: 'PUT', body: data });
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);


const initialState = {
  users: [],
  user: null,
  loadingPage: [],
  total_pages: null,
  status: null,
  error: null,
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [fetchGetUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchGetUsers.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.currentPage = action.payload.page;
      state.total_pages = action.payload.total_pages;

      const likedUsers = () => {
        const savedLiked = localStorage.getItem('listLiked') || [];
        return action.payload.data.map(user => {
          const index = savedLiked.indexOf(user.id);
          if (~index) {
            return { ...user, like: true };
          }
          return user;
        });
      };

      state.users = likedUsers();
    },
    [fetchGetUsers.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.payload;
    },


    [fetchGetUserItem.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchGetUserItem.fulfilled]: (state, action) => {
      state.status = 'resolve';
      state.user = action.payload.data;
    },
    [fetchGetUserItem.rejected]: (state, action) => {
      state.status = 'reject';
      state.error = action.payload;
    },

  },
});


export const userActions = userSlice.actions;
export default userSlice.reducer;
