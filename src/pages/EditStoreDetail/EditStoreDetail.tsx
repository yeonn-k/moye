import React, { useState } from 'react';
import { ESD } from './EditStoreDetail';

const EditStoreDetail = () => {
  const [inputs, setInputs] = useState('');
  const handleUploadPictureClick = () => {};
  const handlePostFormClick = () => {};
  const handleSetIrregularClosedDaysClick = () => {
    console.log('run: 비정기 휴무일 달력에서 설정하기');
  };

  return (
    <ESD.EditStoreDetail>
      <ESD.TopBar>매장 등록</ESD.TopBar>
      <ESD.Body>
        <ESD.BodyLeft>
          <ul>
            <li>
              <label htmlFor="name">매장 이름</label>
              <div>
                <input type="text" id="name" />
              </div>
            </li>
            <li>
              <label htmlFor="businessNumber">사업자 번호</label>
              <div>
                <input
                  type="text"
                  id="businessNumber"
                  placeholder="-는 빼고 입력해주세요"
                />
              </div>
            </li>
            <li>
              <label htmlFor="businessNumber">상호명</label>
              <div>
                <input type="text" id="businessNumber" />
              </div>
            </li>
            <li>
              <label htmlFor="address">매장 주소</label>
              <div>
                <input type="text" id="address" />
              </div>
            </li>
            <li>
              <label htmlFor="phoneNumber">매장 전화번호</label>
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="-는 빼고 입력해주세요"
                />
              </div>
            </li>
            <li>
              <label htmlFor="numberOfSeats">매장 좌석 수</label>
              <div>
                <input
                  type="number"
                  id="numberOfSeats"
                  placeholder="숫자만 입력해주세요"
                  min={0}
                />
              </div>
            </li>
            <li>
              <label htmlFor="numberPerTable">테이블 당 예약 가능한 인원</label>
              <div>
                <input
                  type="number"
                  id="numberPerTable"
                  placeholder="숫자만 입력해주세요"
                  min={0}
                />
              </div>
            </li>
            <li>
              <label htmlFor="introduction">매장 소개글</label>
              <div>
                <input type="text" id="introduction" />
              </div>
            </li>
            <li>
              <span>매장 영업시간</span>
              <div>
                평일&nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시 ~&nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시
              </div>
            </li>
            <li>
              <span></span>
              <div>
                주말&nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시 ~&nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시
              </div>
            </li>
            <li>
              <span>매장 휴식시간</span>
              <div>
                평일&nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시 ~&nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시
              </div>
            </li>
            <li>
              <span></span>
              <div>
                주말 &nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시 ~&nbsp;
                <ESD.TimeInput type="number" min={0} max={24} /> 시
              </div>
            </li>
          </ul>
        </ESD.BodyLeft>
        <ESD.BodyRight>
          <div>
            매장 사진 업로드
            <img src="imageUrl" alt="storeImage" />
          </div>
          <ul>
            <li>
              <label htmlFor="storeName">매장 정기 휴무일 설정</label>
              <input />
            </li>
            <li>
              <label htmlFor="storeName">매장 비정기 휴무일 설정</label>
              <button onClick={handleSetIrregularClosedDaysClick}>
                달력에서 추가하기
              </button>
            </li>
          </ul>
        </ESD.BodyRight>
      </ESD.Body>
    </ESD.EditStoreDetail>
  );
};

export default EditStoreDetail;
