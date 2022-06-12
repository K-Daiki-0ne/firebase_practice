import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type User = {
  displayName: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: { uid: '', photoUrl: '', displayName: '' }
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: '', photoUrl: '', displayName: '' };
    },
    updateUserProfile: (state, action: PayloadAction<User>) => {
      state.user.displayName = action.payload.displayName;
    }
  }
});

export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;