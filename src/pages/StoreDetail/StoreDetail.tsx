import React from 'react';
import { SD } from './StoreDetail';
import { Link } from 'react-router-dom';
import storeData from './storeDetail.json';
import OperatingTimeTable from './OperatingTimeTable.tsx';
import halloween from './halloween.jpg';

const StoreDetail = () => {
  const handleEditStoreClick = () => {
    // TODO: 매장 편집 페이지로 이동
    console.log('go to: editing store page');
  };

  return (
    <>
      <SD.TopBar>
        <p>매장이름</p>
        <Link to="edit">
          <button onClick={handleEditStoreClick}>편집</button>
        </Link>
      </SD.TopBar>
      <SD.Body>
        <SD.BodyLeft>
          <img src={halloween} alt="매장사진"></img>
          <ul>
            <li>
              <span>상호명</span>: {storeData.businessName}
            </li>
            <li>
              <span>사업자 번호</span>: {storeData.businessNumber}
            </li>
            <li>
              <span>매장 전화번호</span>: {storeData.storePhoneNumber}
            </li>
            <li>
              <span>매장 이메일</span>: {storeData.storeEmail}
            </li>
            <br />
            <li>
              <span>전체 좌석 수</span>: {storeData.totalSeats}석
            </li>
            <li>
              <span>테이블당 예약 가능한 최대 인원</span>:{' '}
              {storeData.numberPerTable}명
            </li>
          </ul>
        </SD.BodyLeft>
        <SD.BodyRight>
          <SD.Description>
            <span>Description</span>
            <br />
            <br />
            <p>매장 소개 내용 텍스트</p>
          </SD.Description>
          <OperatingTimeTable />
        </SD.BodyRight>
      </SD.Body>
    </>
  );
};

export default StoreDetail;
