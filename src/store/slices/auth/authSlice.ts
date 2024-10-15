import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginUser {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  avatarUrl: string | null;
}

export interface AuthState {
  token: string | null;
  user: LoginUser | null;
  isStoreSelected: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isStoreSelected: false,
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
    updateUserProfileAction(state, action: PayloadAction<Partial<LoginUser>>) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    logoutAction(state) {
      state.token = null;
      state.user = null;
    },
    setIsStoreSelected(state, action: PayloadAction<boolean>) {
      state.isStoreSelected = action.payload;
    },
  },
});

export const {
  loginAction,
  logoutAction,
  updateUserProfileAction,
  setIsStoreSelected,
} = authSlice.actions;
export default authSlice.reducer;
