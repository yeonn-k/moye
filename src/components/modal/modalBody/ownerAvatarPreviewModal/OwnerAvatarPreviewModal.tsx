import { ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { S } from './OwnerAvatarPreviewModal.style';
import { APIS } from '../../../../config/config';
import { closeModal } from '../../../../store/slices/modal/modalSlice';
import { RootState } from '../../../../store/store';

interface OwnerAvatarPreviewModalProps {
  onClose: () => void;
}

const OwnerAvatarPreviewModal = ({ onClose }: OwnerAvatarPreviewModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<any>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const dispatch = useDispatch();

  const handleUploadImageClick = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const imageFile = e.target.files?.[0];
      if (imageFile) {
        const reader = new FileReader();
        setUploadedImage(imageFile);
        reader.readAsDataURL(imageFile);
        reader.onload = () => {
          setImagePreview(reader.result);
        };
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitClick = async () => {
    if (!uploadedImage || !userId) {
      return;
    }
    const formData = new FormData();
    formData.append('files', uploadedImage);

    try {
      const response = await axios.put(
        `${APIS.users}/${userId}/uploads`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 201) {
        dispatch(closeModal());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageSelectButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <S.ModalBox>
      <S.ModalCloseButton onClick={onClose}>&times;</S.ModalCloseButton>
      <S.ModalText>아바타 변경</S.ModalText>
      <S.ImagePreviewBox>
        {imagePreview && <img src={imagePreview} alt="imagePreview" />}
      </S.ImagePreviewBox>
      <S.ImageSelectButton onClick={handleImageSelectButtonClick}>
        {imagePreview ? '이미지 다시 선택' : '이미지 선택'}
      </S.ImageSelectButton>
      <input
        type="file"
        accept="image/jpg"
        ref={imageInputRef}
        onChange={handleUploadImageClick}
        hidden
      />

      <S.ModalButtonGroup>
        <S.SubmitButton onClick={handleSubmitClick}>저장</S.SubmitButton>
        <S.CancelButton onClick={onClose}>취소</S.CancelButton>
      </S.ModalButtonGroup>
    </S.ModalBox>
  );
};

export default OwnerAvatarPreviewModal;
