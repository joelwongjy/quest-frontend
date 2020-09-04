/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from 'interfaces/models/user';

export interface IMiscDux {
  user?: User;
}

const initialState: IMiscDux = {
  user: undefined,
};

// Contains user information, theme, view selected and fun fact of the day
const misc = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>): void => {
      state.user = { ...action.payload };
    },
    clearUser: (state): void => {
      state.user = undefined;
    },
  },
});

export const { setUser, clearUser } = misc.actions;

export default misc.reducer;
