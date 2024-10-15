import React, { useState, useEffect, useRef } from 'react';
import { ESD } from './EditStoreDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import ListInputElement from './ListInputElement';
import ListTimeElement from './ListTimeElement';
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
  const [regularClosedDays, setRegularClosedDays] = useState<number[]>([]); // API 전송 시 +1
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
    console.log('closedDays: ', irregularClosedDays);
    // 사진은 별도의 POST로 분리하여 요청하기
  };
  const handleCancleFormClick = () => {
    alert('취소하시겠습니까?');
    navigate('/store');
    // TODO: 확인, 취소 창으로 변경
  };
  const handleIrregularClosedDaysClick = () => {
    const newList = irregularClosedDays.filter(
      (item) => item.toDateString() !== selectedClosedDate.toDateString(),
    );
    setIrregularClosedDays([...newList, selectedClosedDate]);
  };
  const handleIrregularClosedDateChange = (date: Date) => {
    setSelectedClosedDate(date);
  };
  const handleDeleteSelectedDateClick = (date: Date) => {
    return () => {
      setIrregularClosedDays(
        irregularClosedDays.filter(
          (item) => item.toDateString() !== date.toDateString(),
        ),
      );
    };
  };

  useEffect(() => console.log(location.state), []);

  return (
    <ESD.EditStoreDetail>
      <ESD.TopBar>매장 편집</ESD.TopBar>
      <ESD.Body>
        <ESD.BodyLeft>
          <ul>
            <ListInputElement
              label="매장 이름"
              type="text"
              id="name"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="사업자 번호"
              type="text"
              id="businessNumber"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="상호명"
              type="text"
              id="businessName"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="주소"
              type="text"
              id="address"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="전화번호"
              type="text"
              id="phoneNumber"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="좌석 수"
              type="text"
              id="numberOfSeats"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="테이블 최대 인원"
              type="text"
              id="numberPerTable"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="소개글"
              type="text"
              id="introduction"
              onChange={handleStoreDetailsInput}
            />
            <ListTimeElement
              totalLabel="영업시간"
              inputLabel="평일"
              type="number"
              min={0}
              max={24}
              startName="weekdayOpen"
              startValue={inputs.weekdayOpen}
              endName="weekdayClose"
              endValue={inputs.weekdayClose}
              onChange={handleHourInput}
            />
            <ListTimeElement
              totalLabel=""
              inputLabel="주말"
              type="number"
              min={0}
              max={24}
              startName="weekendOpen"
              startValue={inputs.weekendOpen}
              endName="weekendClose"
              endValue={inputs.weekendClose}
              onChange={handleHourInput}
            />
            <ListTimeElement
              totalLabel="휴식시간"
              inputLabel="평일"
              type="number"
              min={0}
              max={24}
              startName="weekdayBreakStart"
              startValue={inputs.weekdayBreakStart}
              endName="weekdayBreakEnd"
              endValue={inputs.weekdayBreakEnd}
              onChange={handleHourInput}
            />
            <ListTimeElement
              totalLabel=""
              inputLabel="주말"
              type="number"
              min={0}
              max={24}
              startName="weekendBreakStart"
              startValue={inputs.weekendBreakStart}
              endName="weekendBreakEnd"
              endValue={inputs.weekendBreakEnd}
              onChange={handleHourInput}
            />
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
              </div>
              <ESD.DateAddButton onClick={handleIrregularClosedDaysClick}>
                달력에서 추가하기
              </ESD.DateAddButton>
            </li>
          </ul>
          <ul>
            {irregularClosedDays.map((item) => {
              return (
                <li key={item.toLocaleDateString('ko-KR')}>
                  {item.toLocaleDateString('ko-KR')}
                  <ESD.DateAddButton
                    onClick={handleDeleteSelectedDateClick(item)}
                  >
                    삭제
                  </ESD.DateAddButton>
                </li>
              );
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
