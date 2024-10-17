import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginUser {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  avatarUrl: string | null;
}

export interface Store {
  address: string;
  businessName: string;
  businessRegistrationNumber: string;
  contact: string;
  id: number;
  name: string;
  registerDate: string;
  registerUser: string;
  seatCount: number;
  tableCount: number;
  updateDate: string;
  updateUser: string;
}

export interface AuthState {
  // TODO: 토큰 삭제 예정
  token: string | null;
  user: LoginUser | null;
  isStoreSelected: boolean;
  store: Pick<Store, 'id' | 'businessName'> | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isStoreSelected: true,
  store: null,
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
    setStore(state, action: PayloadAction<Pick<Store, 'id' | 'businessName'>>) {
      state.store = {
        id: action.payload.id,
        businessName: action.payload.businessName,
      };
    },
    setStoreReset(state) {
      state.store = null;
    },
  },
});

export const {
  loginAction,
  logoutAction,
  updateUserProfileAction,
  setIsStoreSelected,
  setStore,
  setStoreReset,
} = authSlice.actions;
export default authSlice.reducer;
