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
  store: Pick<Store, 'id' | 'businessName' | 'name'> | null;
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
    loginAction(
      state,
      action: PayloadAction<{ user: LoginUser; isLoggedIn: boolean }>,
    ) {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
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
      Object.assign(state, initialState);
    },

    setIsStoreSelected(state, action: PayloadAction<boolean>) {
      state.isStoreSelected = action.payload;
    },
    setStore(
      state,
      action: PayloadAction<Pick<Store, 'id' | 'businessName' | 'name'>>,
    ) {
      state.store = {
        id: action.payload.id,
        businessName: action.payload.businessName,
        name: action.payload.name,
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
