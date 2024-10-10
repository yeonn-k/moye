import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isConfirmModalOpen: boolean;
}

const initialState: ModalState = {
  isConfirmModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openConfirmModal(state) {
      state.isConfirmModalOpen = true;
    },
    // 모든 모달의 상태를 false로 업데이트하는 메서드
    closeModal(state) {
      state.isConfirmModalOpen = false;
    },
  },
});

export const { openConfirmModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
