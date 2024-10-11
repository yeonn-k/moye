import React, { useState, useEffect } from 'react';
import { ESD } from './EditStoreDetail';
import { useLocation } from 'react-router-dom';

const initialState = {
  name: '',
  businessName: '',
  businessNumber: '',
  address: '',
  phoneNumber: '',
  numberOfSeats: '',
  numberPerTable: '',
  introduction: '',
  weekdayOpen: '',
  weekdayClose: '',
  weekendOpen: '',
  weekendClose: '',
  weekdayBreakStart: '',
  weekdayBreakEnd: '',
  weekendBreakStart: '',
  weekendBreakEnd: '',
};

const dayOfTheWeeks = ['월', '화', '수', '목', '금', '토', '일'];

const EditStoreDetail = () => {
  const location = useLocation(); // access to location.state
  const [inputs, setInputs] = useState(initialState);
  const [closedDays, setClosedDays] = useState<number[]>([]);
  const handleStoreDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const changeHandler = (checked: boolean, id: number) => {
    if (checked) {
      setClosedDays([...closedDays, id]);
    } else {
      setClosedDays(closedDays.filter((item) => item !== id));
    }
  };
  const handleUploadPictureClick = () => {
    console.log('사진 업로드');
  };
  const handlePostFormClick = () => {
    console.log('폼 제출');
  };
  const handleIrregularClosedDaysClick = () => {
    console.log('run: 비정기 휴무일 달력에서 설정하기');
  };

  useEffect(() => console.log(location.state), []);

  return (
    <ESD.EditStoreDetail>
      <ESD.TopBar>매장 등록</ESD.TopBar>
      <ESD.Body>
        <ESD.BodyLeft>
          <ul>
            <li>
              <label htmlFor="name">매장 이름</label>
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleStoreDetailsInput}
                />
              </div>
            </li>
            <li>
              <label htmlFor="businessNumber">사업자 번호</label>
              <div>
                <input
                  type="text"
                  id="businessNumber"
                  name="businessNumber"
                  placeholder="-는 빼고 입력해주세요"
                  onChange={handleStoreDetailsInput}
                />
              </div>
            </li>
            <li>
              <label htmlFor="businessName">상호명</label>
              <div>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  onChange={handleStoreDetailsInput}
                />
              </div>
            </li>
            <li>
              <label htmlFor="address">매장 주소</label>
              <div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={handleStoreDetailsInput}
                />
              </div>
            </li>
            <li>
              <label htmlFor="phoneNumber">매장 전화번호</label>
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="-는 빼고 입력해주세요"
                  onChange={handleStoreDetailsInput}
                />
              </div>
            </li>
            <li>
              <label htmlFor="numberOfSeats">매장 좌석 수</label>
              <div>
                <input
                  type="number"
                  id="numberOfSeats"
                  name="numberOfSeats"
                  placeholder="숫자만 입력해주세요"
                  onChange={handleStoreDetailsInput}
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
                  name="numberPerTable"
                  placeholder="숫자만 입력해주세요"
                  onChange={handleStoreDetailsInput}
                  min={0}
                />
              </div>
            </li>
            <li>
              <label htmlFor="introduction">매장 소개글</label>
              <div>
                <input
                  type="text"
                  id="introduction"
                  name="introduction"
                  onChange={handleStoreDetailsInput}
                />
              </div>
            </li>
            <li>
              <span>매장 영업시간</span>
              <div>
                평일&nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekdayOpen"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시 ~&nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekdayClose"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시
              </div>
            </li>
            <li>
              <span></span>
              <div>
                주말&nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekendOpen"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시 ~&nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekendClose"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시
              </div>
            </li>
            <li>
              <span>매장 휴식시간</span>
              <div>
                평일&nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekdayBreakStart"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시 ~&nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekdayBreakEnd"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시
              </div>
            </li>
            <li>
              <span></span>
              <div>
                주말 &nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekendBreakStart"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시 ~&nbsp;
                <ESD.TimeInput
                  type="number"
                  min={0}
                  max={24}
                  name="weekendBreakEnd"
                  onChange={handleStoreDetailsInput}
                />{' '}
                시
              </div>
            </li>
          </ul>
        </ESD.BodyLeft>
        <ESD.BodyRight>
          <div>
            매장 사진 업로드
            <img
              src="imageUrl"
              alt="storeImage"
              onClick={() => {
                let list = [''];
                closedDays.forEach((item) => list.push(dayOfTheWeeks[item]));
                console.log(list);
                console.log(inputs);
              }}
            />
          </div>
          <ul>
            <li>
              <label htmlFor="storeName">매장 정기 휴무일 설정</label>
              {dayOfTheWeeks.map((day, index) => (
                <>
                  <input
                    id={index.toString()}
                    type="checkbox"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeHandler(e.currentTarget.checked, index);
                    }}
                    checked={closedDays.includes(index) ? true : false}
                  />
                  {day}
                </>
              ))}
            </li>
            <li></li>
          </ul>
        </ESD.BodyRight>
      </ESD.Body>
    </ESD.EditStoreDetail>
  );
};

export default EditStoreDetail;
