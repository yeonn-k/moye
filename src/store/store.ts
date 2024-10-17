import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import modalReducer from './slices/modal/modalSlice';

const loadAuthState = () => {
  const savedAuthState = localStorage.getItem('auth');
  return savedAuthState
    ? JSON.parse(savedAuthState)
    : {
        token: null,
        user: {
          id: null,
          email: null,
          name: null,
          phone: null,
          avatarUrl: null,
        },
        isStoreSelected: false,
        store: null,
      };
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
  preloadedState: {
    auth: loadAuthState(),
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    'auth',
    JSON.stringify({
      user: state.auth.user,
      isStoreSelected: state.auth.isStoreSelected,
      store: state.auth.store,
    }),
  );
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
