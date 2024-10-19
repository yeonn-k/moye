import React, { useState } from 'react';
import { ESD } from './EditStoreDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import ListInputElement from './ListInputElement';
import ListTimeElement from './ListTimeElement';
import DatePicker from 'react-datepicker';
import ROUTE_LINK from '../../../routes/RouterLink';
import 'react-datepicker/dist/react-datepicker.css';
import {
  StoreDetailData,
  RegularHoliday,
  IrregularCloseDay,
} from '../StoreDetailInterface';
import baseUploadImage from '../../../assets/images/baseUploadImage.png';
import { APIS } from '../../../config/config';

let initialState = {
  id: '',
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

function mapStoreData(storeData: StoreDetailData) {
  initialState.name = storeData.name;
  initialState.businessName = storeData.businessName;
  initialState.businessNumber = storeData.businessRegistrationNumber;
  initialState.address = storeData.address;
  initialState.contact = storeData.contact;
  initialState.totalSeats = storeData.totalSeats;
  initialState.numberPerTable = storeData.numberPerTable.toString();
  initialState.description = storeData.description;
  initialState.weekdayOpen = storeData.openingHour.filter(
    (item) => item.type === '평일',
  )[0].openFrom;
  initialState.weekdayClose = storeData.openingHour.filter(
    (item) => item.type === '평일',
  )[0].closeTo;
  initialState.weekendOpen = storeData.openingHour.filter(
    (item) => item.type === '주말',
  )[0].openFrom;
  initialState.weekendClose = storeData.openingHour.filter(
    (item) => item.type === '주말',
  )[0].closeTo;
  initialState.weekdayBreakStart = storeData.openingHour.filter(
    (item) => item.type === '평일',
  )[0].startBreakTime;
  initialState.weekdayBreakEnd = storeData.openingHour.filter(
    (item) => item.type === '평일',
  )[0].endBreakTime;
  initialState.weekendBreakStart = storeData.openingHour.filter(
    (item) => item.type === '주말',
  )[0].startBreakTime;
  initialState.weekendBreakEnd = storeData.openingHour.filter(
    (item) => item.type === '주말',
  )[0].endBreakTime;
  return initialState;
}

function mapRegularHoliday(storeData: StoreDetailData): number[] {
  const newRegularHoliday: number[] = [];

  storeData.regularHoliday.map((item: RegularHoliday) => {
    if (!newRegularHoliday.includes(item.closedDay)) {
      newRegularHoliday.push(item.closedDay);
    }
  });
  return newRegularHoliday;
}

function mapIrregularClosedDays(storeData: StoreDetailData): string[] {
  const newIrregularClosedDays: string[] = [];

  storeData.closedDay.map((item: IrregularCloseDay) =>
    newIrregularClosedDays.push(item.ymd),
  );
  return newIrregularClosedDays;
}

const DATE_FORMAT = 'YYYY-MM-DD';

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];

function isEmpty(time: string) {
  return time === '' || time === ':';
}

const EditStoreDetail = () => {
  const storeData: StoreDetailData = useLocation().state.data;
  const previousPreviewImage = useLocation().state.previewImage;
  const previousImageFile = useLocation().state.previousImageFile;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(mapStoreData(storeData));
  const [uploadedImage, setUploadedImage] = useState<File | string>(
    previousImageFile,
  );
  const [imagePreview, setImagePreview] = useState<any>(previousPreviewImage);
  const [regularClosedDays, setRegularClosedDays] = useState<number[]>(
    mapRegularHoliday(storeData),
  );
  const [selectedClosedDate, setSelectedClosedDate] = useState(new Date());
  const [irregularClosedDays, setIrregularClosedDays] = useState<string[]>(
    mapIrregularClosedDays(storeData),
  );

  const handleStoreDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputs({
      ...inputs,
      description: e.target.value,
    });
  };
  const handleHourInput = (name: string, value: string) => {
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const changeHandler = (checked: boolean, id: number) => {
    if (checked) {
      setRegularClosedDays([...regularClosedDays, id]);
    } else {
      setRegularClosedDays(regularClosedDays.filter((item) => item !== id));
    }
  };
  const handlePostFormSubmit = async () => {
    try {
      const formData = new FormData();
      const openingHourData = [
        {
          type: '평일',
          openFrom: inputs.weekdayOpen,
          closeTo: inputs.weekdayClose,
        },
        {
          type: '주말',
          openFrom: inputs.weekendOpen,
          closeTo: inputs.weekendClose,
        },
      ];
      const breakTimeData = [
        {
          type: '평일',
          openFrom: inputs.weekdayBreakStart,
          closeTo: inputs.weekdayBreakEnd,
        },
        {
          type: '주말',
          openFrom: inputs.weekendBreakStart,
          closeTo: inputs.weekendBreakEnd,
        },
      ];
      formData.append('businessRegistrationNumber', inputs.businessNumber);
      formData.append('businessName', inputs.businessName);
      formData.append('name', inputs.name);
      formData.append('address', inputs.address);
      formData.append('contact', inputs.contact);
      formData.append('totalSeats', inputs.totalSeats);
      formData.append('numberPerTable', inputs.numberPerTable);
      formData.append('description', inputs.description);
      formData.append('openingHour', JSON.stringify(openingHourData));
      formData.append('closedDay', JSON.stringify(irregularClosedDays));
      formData.append('dayOfWeekDay', JSON.stringify(regularClosedDays));
      formData.append('files', uploadedImage);
      if (
        !isEmpty(inputs.weekdayBreakStart) &&
        !isEmpty(inputs.weekdayBreakEnd) &&
        !isEmpty(inputs.weekendBreakStart) &&
        !isEmpty(inputs.weekendBreakEnd)
      ) {
        formData.append('breakTime', JSON.stringify(breakTimeData));
      }
      await axios
        .put(`${APIS.store}/${storeData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          alert('매장 정보가 수정되었습니다.');
          console.log(res.data);
        })
        .catch((error) => {
          console.log('Error: ', error);
          alert('매장 수정에 실패했습니다.');
        });
    } catch (error) {
      console.log('Error: ', error);
      alert('매장 수정에 실패했습니다.');
    } finally {
      navigate(`${ROUTE_LINK.STORE.link}/${storeData.id}`);
    }
  };
  const handleCancleFormClick = () => {
    if (window.confirm('취소하시겠습니까?')) {
      navigate(`${ROUTE_LINK.STORE.link}/${storeData.id}`);
    }
  };
  const handleIrregularClosedDaysClick = () => {
    const formattedDate = dayjs(selectedClosedDate).format(DATE_FORMAT);
    const newList = irregularClosedDays.filter(
      (item) => item !== formattedDate,
    );
    setIrregularClosedDays([...newList, formattedDate]);
  };
  const handleIrregularClosedDateChange = (date: any) => {
    setSelectedClosedDate(date);
  };
  const handleDeleteSelectedDateClick = (date: string) => {
    return () => {
      setIrregularClosedDays(
        irregularClosedDays.filter((item) => item !== date),
      );
    };
  };
  const handleUpload = ({ target }: any) => {
    try {
      const imageFile = target.files?.[0];

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
  const handleDrop = (e: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();

      setUploadedImage(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => setImagePreview(reader.result);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
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
              value={inputs.name}
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="사업자 번호"
              type="text"
              id="businessNumber"
              value={inputs.businessNumber}
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="상호명"
              type="text"
              id="businessName"
              value={inputs.businessName}
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="주소"
              type="text"
              id="address"
              value={inputs.address}
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="전화번호"
              type="text"
              id="contact"
              value={inputs.contact}
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="좌석 수"
              type="text"
              id="totalSeats"
              value={inputs.totalSeats}
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="테이블 최대 인원"
              type="text"
              id="numberPerTable"
              value={inputs.numberPerTable}
              onChange={handleStoreDetailsInput}
            />
            <li>
              <label htmlFor="description">소개글</label>
              <div>
                <ESD.CustomTextarea
                  value={inputs.description}
                  id="description"
                  onChange={handleTextareaChange}
                />
              </div>
            </li>
            <ListTimeElement
              totalLabel="영업시간"
              inputLabel="평일"
              startName="weekdayOpen"
              startValue={inputs.weekdayOpen}
              endName="weekdayClose"
              endValue={inputs.weekdayClose}
              onChange={handleHourInput}
            />
            <ListTimeElement
              totalLabel=""
              inputLabel="주말"
              startName="weekendOpen"
              startValue={inputs.weekendOpen}
              endName="weekendClose"
              endValue={inputs.weekendClose}
              onChange={handleHourInput}
            />
            <ListTimeElement
              totalLabel="휴식시간"
              inputLabel="평일"
              startName="weekdayBreakStart"
              startValue={inputs.weekdayBreakStart}
              endName="weekdayBreakEnd"
              endValue={inputs.weekdayBreakEnd}
              onChange={handleHourInput}
            />
            <ListTimeElement
              totalLabel=""
              inputLabel="주말"
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
              <ESD.ImageUploadBox
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                htmlFor="imageUploadInput"
              >
                <input
                  type="file"
                  id="imageUploadInput"
                  onChange={handleUpload}
                />
                <ESD.CustomImgPreview
                  uploaded={uploadedImage !== ''}
                  src={imagePreview ? imagePreview : baseUploadImage}
                  alt="storeImage.jpg"
                />
              </ESD.ImageUploadBox>
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
              <ESD.DatePickerContainer>
                <DatePicker
                  className="datePicker"
                  dateFormat="yyyy/MM/dd"
                  shouldCloseOnSelect
                  minDate={new Date()}
                  showPopperArrow={false}
                  fixedHeight
                  selected={selectedClosedDate}
                  onChange={handleIrregularClosedDateChange}
                />
              </ESD.DatePickerContainer>
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
        <ESD.CancleButton onClick={handleCancleFormClick}>
          취소
        </ESD.CancleButton>
      </ESD.ConfirmBar>
    </ESD.EditStoreDetail>
  );
};

export default EditStoreDetail;
