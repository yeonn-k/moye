import { useState, useEffect } from 'react';
import { SD } from './StoreDetail';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StoreDetailData, initialState } from './StoreDetailInterface.ts';
import OperatingTimeTable from './OperatingTimeTable.tsx';
import halloween from './halloween.jpg';

function isExist(data: any) {
  return data !== null && data !== undefined;
}

const StoreDetail = () => {
  const [storeData, setStoreData] = useState<StoreDetailData>(initialState);

  useEffect(() => {
    let auth = null;

    if (isExist(localStorage) && isExist(localStorage.getItem('auth'))) {
      auth = JSON.parse(localStorage.getItem('auth'));
    }
    axios
      .get('http://localhost:5005/stores/3', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setStoreData(res.data.body);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }, []);

  return (
    <>
      <SD.TopBar>
        <p>매장이름</p>
        <Link to="edit" state={{ data: 20070221 }}>
          <button>편집</button>
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
              <span>사업자 번호</span>: {storeData.businessRegistrationNumber}
            </li>
            <li>
              <span>매장 전화번호</span>: {storeData.contact}
            </li>
            <li>
              <span>매장 이메일</span>: {storeData.email}
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
            <p>{storeData.description}</p>
          </SD.Description>
          <OperatingTimeTable
            openingHour={storeData.openingHour}
            regularHoliday={storeData.regularHoliday}
            closedDay={storeData.closedDay}
          />
        </SD.BodyRight>
      </SD.Body>
    </>
  );
};

export default StoreDetail;
