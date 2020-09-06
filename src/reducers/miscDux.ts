/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from 'interfaces/models/users';

export interface IMiscDux {
  user?: User;
  lastRetrieved?: number;
}

const initialState: IMiscDux = {};

// Contains user information, theme, view selected and fun fact of the day
const misc = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>): void => {
      state.user = { ...action.payload };
      state.lastRetrieved = Date.now();
    },
    clearUser: (state): void => {
      state.user = undefined;
      state.lastRetrieved = undefined;
    },
  },
});

export const { setUser, clearUser } = misc.actions;

export default misc.reducer;
