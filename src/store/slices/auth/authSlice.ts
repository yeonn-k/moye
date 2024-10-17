import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginUser {
  id: string | null;
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
  user: LoginUser | null;
  isStoreSelected: boolean;
  isLoggedIn: boolean;
  store: Pick<Store, 'id' | 'businessName'> | null;
}

const initialState: AuthState = {
  user: null,
  isStoreSelected: false,
  isLoggedIn: false,
  store: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction(state, action: PayloadAction<{ user: LoginUser }>) {
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
      state.user = null;
      state.isLoggedIn = false;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
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
