import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginUser {
  name: string;
  avatarUrl?: string;
}

export interface AuthState {
  token: string | null;
  user: LoginUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction(
      state,
      action: PayloadAction<{ token: string; user: LoginUser }>,
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginAction, logout } = authSlice.actions;
export default authSlice.reducer;
