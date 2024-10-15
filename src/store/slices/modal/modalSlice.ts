import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  modalType: string;
}

const initialState: ModalState = {
  modalType: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.modalType = action.payload;
    },
    // 모든 모달의 상태를 ''로 업데이트하는 메서드
    closeModal(state) {
      state.modalType = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
