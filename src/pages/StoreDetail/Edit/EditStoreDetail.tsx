import React, { useState, useEffect } from 'react';
import { ESD } from './EditStoreDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import ListInputElement from './ListInputElement';
import ListTimeElement from './ListTimeElement';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface localStorageData {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone: string;
    stores: string;
    avatarUrl: string;
  };
}

const initialState = {
  name: '',
  businessName: '',
  businessNumber: '',
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

const DATE_FORMAT = 'YYYY-MM-DD';

const TIME_SUBFIX = ':00';

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];

function addTimeSubfix(time: string) {
  return time + TIME_SUBFIX;
}

function isExist(data: any) {
  return data !== null && data !== undefined;
}

const EditStoreDetail = () => {
  const location = useLocation(); // access to location.state
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialState);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [regularClosedDays, setRegularClosedDays] = useState<number[]>([]);
  const [selectedClosedDate, setSelectedClosedDate] = useState(new Date());
  const [irregularClosedDays, setIrregularClosedDays] = useState<string[]>([]);

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
  const handleUploadPictureClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const imageFile = e.target.files?.[0];

      if (imageFile) {
        const reader = new FileReader();

        setUploadedImage(imageFile);
        reader.readAsDataURL(imageFile);
        reader.onloadend = () => setImagePreview(reader.result);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handlePostFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      let auth = null;
      if (isExist(localStorage) && isExist(localStorage.getItem('auth'))) {
        auth = JSON.parse(localStorage.getItem('auth'));
      }
      const openingHourData = [
        {
          type: '평일',
          openFrom: addTimeSubfix(inputs.weekdayOpen),
          closeTo: addTimeSubfix(inputs.weekdayClose),
        },
        {
          type: '주말',
          openFrom: addTimeSubfix(inputs.weekendOpen),
          closeTo: addTimeSubfix(inputs.weekendClose),
        },
      ];
      const breakTimeData = [
        {
          type: '평일',
          openFrom: addTimeSubfix(inputs.weekdayBreakStart),
          closeTo: addTimeSubfix(inputs.weekdayBreakEnd),
        },
        {
          type: '주말',
          openFrom: addTimeSubfix(inputs.weekendBreakStart),
          closeTo: addTimeSubfix(inputs.weekendBreakEnd),
        },
      ];
      const postData = {
        businessRegistrationNumber: inputs.businessNumber,
        businessName: inputs.businessName,
        description: inputs.description,
        name: inputs.name,
        address: inputs.address,
        contact: inputs.contact,
        totalSeats: inputs.totalSeats,
        numberPerTable: inputs.numberPerTable,
        openingHour: openingHourData,
        breakTime: breakTimeData,
        closedDay: irregularClosedDays,
        dayOfWeekDay: regularClosedDays.map((index: number) => index + 1),
      };
      // backend에서 요일을 일=1, 월=2 ~ 토=7으로 받음, front에서는 0~6으로 배정됨

      await axios
        .post('http://localhost:5005/stores', JSON.stringify(postData), {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          alert('매장이 등록되었습니다.');
          console.log(res);
        })
        .catch((error) => {
          alert('매장 등록에 실패하였습니다.');
          console.log('Error: ', error);
        });
      formData.append('files', uploadedImage);
      axios.post('http://localhost:5005/uploads/3', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleCancleFormClick = () => {
    // 취소 되묻기 기능, PRG 문제 방지
  };
  const handleIrregularClosedDaysClick = () => {
    const formattedDate = dayjs(selectedClosedDate).format(DATE_FORMAT);
    const newList = irregularClosedDays.filter(
      (item) => item !== formattedDate,
    );
    setIrregularClosedDays([...newList, formattedDate]);
  };
  const handleIrregularClosedDateChange = (date: Date) => {
    setSelectedClosedDate(date);
  };
  const handleDeleteSelectedDateClick = (date: string) => {
    return () => {
      setIrregularClosedDays(
        irregularClosedDays.filter((item) => item !== date),
      );
    };
  };

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
              id="contact"
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="좌석 수"
              type="text"
              id="totalSeats"
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
              id="description"
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
                <img
                  src={
                    imagePreview ? imagePreview : '../StoreDetail/halloween.jpg'
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  onChange={handleUploadPictureClick}
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
            {irregularClosedDays.map((item) => (
              <li key={item}>
                {item}
                <ESD.DateAddButton
                  onClick={handleDeleteSelectedDateClick(item)}
                >
                  삭제
                </ESD.DateAddButton>
              </li>
            ))}
          </ul>
        </ESD.BodyRight>
      </ESD.Body>
      <ESD.ConfirmBar>
        <button onClick={handlePostFormSubmit}>확인</button>
        <button onClick={handleCancleFormClick}>취소</button>
      </ESD.ConfirmBar>
    </ESD.EditStoreDetail>
  );
};

export default EditStoreDetail;
