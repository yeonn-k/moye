import React from 'react';
import { S } from './SearchModal';
import UserInput from '../../../common/UserInput/UserInput.tsx';

interface SearchModalProps {
  onClose: () => void;
}

const SearchModal = ({ onClose }: SearchModalProps) => {
  return (
    <S.SearchModal>
      <S.FlexBox>
        <S.Title>이름</S.Title>
        <S.InputBox>
          <S.SearchIcon />
          <UserInput
            placeholder="예약자명을 입력하세요"
            width="450px"
            color="white"
            height="25px"
          />
        </S.InputBox>
      </S.FlexBox>
      <S.Line />
      <S.ListTitle>검색 결과</S.ListTitle>
      <S.Line />
      <S.Table>
        <S.Cell>이름</S.Cell>
        <S.Cell>연락처</S.Cell>
        <S.Cell>인원</S.Cell>
        <S.Cell>예약 날짜</S.Cell>
        <S.Cell>예약 시간</S.Cell>
      </S.Table>
    </S.SearchModal>
  );
};

export default SearchModal;
