import React, { useEffect, useState } from 'react';
import { S } from './SearchModal.style.ts';
import UserInput from '../../../common/UserInput/UserInput.tsx';
import useInputValue from '../../../../hooks/useInputValue.tsx';
import useCheckTheDate from '../../../../hooks/useCheckTheDate.tsx';
import useCheckAuth from '../../../../hooks/useCheckAuth.tsx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store.ts';
import { APIS } from '../../../../config/config.ts';

interface SearchModalProps {
  onClose: () => void;
}

interface Items {
  count: number;
  endTime: string;
  name: string;
  phone: string;
  resrvationId: number;
  startTime: string;
  status: string;
  ymd: string;
}

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [inputValue, setInputValue] = useInputValue();
  const [searched, setSearched] = useState([]);

  const storeId = useSelector((state: RootState) => state.auth.store?.id);

  const searchByPhone = async (input: string) => {
    try {
      const res = await axios.get(
        `${APIS.store}/${storeId}/reservations?search=${inputValue}`,
      );
      if (inputValue) {
        setSearched(res.data.body);
      }
    } catch (err) {
      console.error('❌ searchByPhone: ', err);
    }
  };

  useEffect(() => {
    searchByPhone(inputValue);
  }, [inputValue]);

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
            value={inputValue}
            onChange={setInputValue}
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

        {searched.length == 0 ? (
          <S.FullCell>검색 결과가 없습니다</S.FullCell>
        ) : (
          searched.map((item: Items) => {
            return (
              <>
                <S.Cell>{item.name}</S.Cell>
                <S.Cell>{item.phone}</S.Cell>
                <S.Cell>{item.count}</S.Cell>
                <S.Cell>{item.ymd.slice(0, -2)}</S.Cell>
                <S.Cell>
                  {item.startTime} ~ {item.endTime}
                </S.Cell>
              </>
            );
          })
        )}
      </S.Table>
    </S.SearchModal>
  );
};

export default SearchModal;
