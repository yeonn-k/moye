import React from 'react';
import { SD } from './StoreDetail';
import { Link } from 'react-router-dom';

const StoreDetail = () => {
  const handleEditStoreClick = () => {
    // TODO: 매장 편집 페이지로 이동
    console.log('go to: editing store page');
  };

  return (
    <SD.StoreDetail>
      <SD.StoreDetailTopBar>
        <p>매장이름</p>
        <button onClick={handleEditStoreClick}>edit</button>
      </SD.StoreDetailTopBar>
      <SD.StoreDetailBody>
        <SD.StoreDetailBodyLeft>
          <img src="storeImageUrl" alt="매장사진"></img>
          <ul>
            <li>
              <span>매장 사업자 번호</span>: 000-00-000000
            </li>
            <li>
              <span>매장 전화번호</span>: 000-0000-0000
            </li>
            <li>
              <span>매장 이메일</span>: email@gmail.com
            </li>
            <br />
            <li>
              <span>전체 좌석 수</span>: 000석
            </li>
            <li>
              <span>테이블당 예약 가능한 최대 인원</span>: 00명
            </li>
          </ul>
        </SD.StoreDetailBodyLeft>
        <SD.StoreDetailBodyRight>
          <SD.Description>
            <span>Description</span>
            <br />
            <br />
            <p>매장 소개 내용 텍스트</p>
          </SD.Description>
          <SD.OperatingTimeTable>
            <thead>
              <tr>
                <th></th>
                <th>운영 시간</th>
                <th>휴식 시간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>평일</td>
                <td>10시~22시</td>
                <td>14시~17시</td>
              </tr>
              <tr>
                <td>주말</td>
                <td>11시~23시</td>
                <td>14시~17시</td>
              </tr>
              <tr>
                <td>휴무일</td>
                <td>매주 월, 화요일</td>
                <td></td>
              </tr>
            </tbody>
          </SD.OperatingTimeTable>
        </SD.StoreDetailBodyRight>
      </SD.StoreDetailBody>
    </SD.StoreDetail>
  );
};

export default StoreDetail;
