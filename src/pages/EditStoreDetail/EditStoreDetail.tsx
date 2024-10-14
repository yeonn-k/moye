import React, { useState, useEffect, useRef } from 'react';
import { ESD } from './EditStoreDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  name: '',
  businessName: '',
  businessRegistrationNumber: '',
  address: '',
  contact: '',
  totalSeats: '',
  numberPerTable: '',
  description: '',
  weekdayOpen: '',
  weekdayClose: '',
  weekendOpen: '',
  weekendClose: '',
  weekdayBreakStart: '',
  weekdayBreakEnd: '',
  weekendBreakStart: '',
  weekendBreakEnd: '',
};

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];

const EditStoreDetail = () => {
  const location = useLocation(); // access to location.state
  const [inputs, setInputs] = useState(initialState);
  const [regularClosedDays, setRegularClosedDays] = useState<number[]>([]);
  const [imgFile, setImgFile] = useState('');
  const [selectedClosedDate, setSelectedClosedDate] = useState(new Date());
  const [irregularClosedDays, setIrregularClosedDays] = useState<Date[]>([]);
  const imgRef = useRef();
  const navigate = useNavigate();
  const handleStoreDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleHourInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hour = Number(e.target.value);
    if (!isNaN(hour) && hour >= 0 && hour <= 24) {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const changeHandler = (checked: boolean, id: number) => {
    if (checked) {
      setRegularClosedDays([...regularClosedDays, id]);
    } else {
      setRegularClosedDays(regularClosedDays.filter((item) => item !== id));
    }
  };
  const handleUploadPictureClick = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    // console.log('사진 업로드');
  };
  const handlePostFormClick = () => {
    console.log('inputs: ', inputs);
    console.log('closedDays:', regularClosedDays);
    console.log('imgFile: ', imgFile);
    console.log('location: ', location);
    // 사진은 별도의 POST로 분리하여 요청하기
  };
  const handleCancleFormClick = () => {
    alert('취소하시겠습니까?');
    navigate('/store');
  };
  const handleIrregularClosedDaysClick = () => {
    setIrregularClosedDays([...irregularClosedDays, selectedClosedDate]);
    console.log(selectedClosedDate);
  };
  const handleIrregularClosedDateChange = (date: Date) => {
    setSelectedClosedDate(date);
  };

  useEffect(() => console.log(location.state), []);

  return (
    <ESD.EditStoreDetail>
      <ESD.TopBar>매장 편집</ESD.TopBar>
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
              <label htmlFor="address">주소</label>
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
              <label htmlFor="phoneNumber">전화번호</label>
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
              <label htmlFor="numberOfSeats">좌석 수</label>
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
              <label htmlFor="numberPerTable">테이블 최대 인원</label>
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
              <label htmlFor="introduction">소개글</label>
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
              <span>영업시간</span>
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
              <span>휴식시간</span>
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
          <ul>
            <li>
              <div>
                <img src={imgFile ? imgFile : '../StoreDetail/halloween.jpg'} />
                <input
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  onChange={handleUploadPictureClick}
                  ref={imgRef}
                />
              </div>
            </li>
            <li>
              <span>정기 휴무일</span>
              <div>
                {dayOfTheWeeks.map((day, index) => (
                  <label>
                    <input
                      id={index.toString()}
                      type="checkbox"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        changeHandler(e.currentTarget.checked, index);
                      }}
                      checked={regularClosedDays.includes(index) ? true : false}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
            </li>
            <li>
              <span>비정기 휴무일</span>
              <div>
                <DatePicker
                  selected={selectedClosedDate}
                  onChange={handleIrregularClosedDateChange}
                />
                <button onClick={handleIrregularClosedDaysClick}>
                  달력에서 추가하기
                </button>
              </div>
            </li>
          </ul>
          <ul>
            {irregularClosedDays.map((item) => {
              return <li>{item.toDateString()}</li>;
            })}
          </ul>
        </ESD.BodyRight>
      </ESD.Body>
      <ESD.ConfirmBar>
        <button onClick={handlePostFormClick}>확인</button>
        <button onClick={handleCancleFormClick}>취소</button>
      </ESD.ConfirmBar>
    </ESD.EditStoreDetail>
  );
};

export default EditStoreDetail;
