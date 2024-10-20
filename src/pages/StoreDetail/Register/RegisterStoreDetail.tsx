import React, { useState, useEffect } from 'react';
import { RSD } from './RegisterStoreDetail.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListInputElement from '../Edit/ListInputElement.tsx';
import ListTimeElement from '../Edit/ListTimeElement.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import ROUTE_LINK from '../../../routes/RouterLink.ts';
import { APIS } from '../../../config/config.ts';
import baseUploadImage from '../../../assets/images/baseUploadImage.png';
import { storeValidate } from '../../../utils/storeValidator.ts';

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
};

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];

const RegisterStoreDetail = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialState);
  const [uploadedImage, setUploadedImage] = useState<File | string>('');
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [regularClosedDays, setRegularClosedDays] = useState<number[]>([]);
  const [validErrors, setValidErrors] = useState({
    name: '',
    businessName: '',
    businessNumber: '',
    address: '',
    contact: '',
    totalSeats: '',
    numberPerTable: '',
  });

  const handleStoreDetailsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    const error = storeValidate(e.target.name, e.target.value);
    setValidErrors((prev) => ({
      ...prev,
      [e.target.name]: error,
    }));
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
  const handlePostFormSubmit = async () => {
    try {
      if (
        !inputs.weekdayOpen ||
        !inputs.weekdayClose ||
        !inputs.weekendOpen ||
        !inputs.weekendClose
      ) {
        throw new Error('영업 시간을 입력해주세요.');
      }
      for (const item of Object.values(validErrors)) {
        if (item || item === '') {
          throw new Error(`형식에 맞지 않는 값이 있습니다.`);
        }
      }
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
      formData.append('businessRegistrationNumber', inputs.businessNumber);
      formData.append('businessName', inputs.businessName);
      formData.append('name', inputs.name);
      formData.append('address', inputs.address);
      formData.append('contact', inputs.contact);
      formData.append('totalSeats', inputs.totalSeats);
      formData.append('numberPerTable', inputs.numberPerTable);
      formData.append('description', inputs.description);
      formData.append('openingHour', JSON.stringify(openingHourData));
      formData.append('dayOfWeekDay', JSON.stringify(regularClosedDays));
      formData.append('files', uploadedImage);

      await axios
        .post(APIS.store, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('매장등록성공');
        })
        .catch((error) => {
          console.log('Error: ', error);
          alert('매장 등록 중에 오류가 발생했습니다.');
        });
      navigate(ROUTE_LINK.OWNER.link);
    } catch (error) {
      alert(error);
    }
  };
  const handleCancleFormClick = () => {
    if (window.confirm('취소하시겠습니까?')) {
      navigate(`${ROUTE_LINK.OWNER.link}`);
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
    <RSD.EditStoreDetail>
      <RSD.TopBar>매장 등록</RSD.TopBar>
      <RSD.Body>
        <RSD.BodyLeft>
          <ul>
            <RSD.ErrorMessage className={validErrors.name ? 'visible' : ''}>
              {validErrors.name}
            </RSD.ErrorMessage>
            <ListInputElement
              label="매장 이름"
              type="text"
              id="name"
              value={inputs.name}
              onChange={handleStoreDetailsInput}
            />
            <RSD.ErrorMessage
              className={validErrors.businessNumber ? 'visible' : ''}
            >
              {validErrors.businessNumber}
            </RSD.ErrorMessage>
            <ListInputElement
              label="사업자 번호"
              type="text"
              id="businessNumber"
              value={inputs.businessNumber}
              onChange={handleStoreDetailsInput}
            />
            <RSD.ErrorMessage
              className={validErrors.businessName ? 'visible' : ''}
            >
              {validErrors.businessName}
            </RSD.ErrorMessage>
            <ListInputElement
              label="상호명"
              type="text"
              id="businessName"
              value={inputs.businessName}
              onChange={handleStoreDetailsInput}
            />
            <RSD.ErrorMessage className={validErrors.address ? 'visible' : ''}>
              {validErrors.address}
            </RSD.ErrorMessage>
            <ListInputElement
              label="주소"
              type="text"
              id="address"
              value={inputs.address}
              onChange={handleStoreDetailsInput}
            />
            <RSD.ErrorMessage className={validErrors.contact ? 'visible' : ''}>
              {validErrors.contact}
            </RSD.ErrorMessage>
            <ListInputElement
              label="전화번호"
              type="text"
              id="contact"
              value={inputs.contact}
              onChange={handleStoreDetailsInput}
            />
            <RSD.ErrorMessage
              className={validErrors.totalSeats ? 'visible' : ''}
            >
              {validErrors.totalSeats}
            </RSD.ErrorMessage>
            <ListInputElement
              label="좌석 수"
              type="text"
              id="totalSeats"
              value={inputs.totalSeats}
              onChange={handleStoreDetailsInput}
            />
            <RSD.ErrorMessage
              className={validErrors.numberPerTable ? 'visible' : ''}
            >
              {validErrors.numberPerTable}
            </RSD.ErrorMessage>
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
                <RSD.CustomTextarea
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
          </ul>
        </RSD.BodyLeft>
        <RSD.BodyRight>
          <ul>
            <li>
              <RSD.ImageUploadBox
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                htmlFor="imageUploadInput"
              >
                <input
                  type="file"
                  id="imageUploadInput"
                  onChange={handleUpload}
                />
                <RSD.CustomImgPreview
                  uploaded={uploadedImage !== ''}
                  src={imagePreview ? imagePreview : baseUploadImage}
                  alt="storeImage.jpg"
                />
                {!imagePreview && (
                  <p>사진을 업로드하려면 클릭하거나 마우스로 올려주세요</p>
                )}
              </RSD.ImageUploadBox>
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
          </ul>
        </RSD.BodyRight>
      </RSD.Body>
      <RSD.ConfirmBar>
        <button onClick={handlePostFormSubmit}>확인</button>
        <RSD.CancleButton onClick={handleCancleFormClick}>
          취소
        </RSD.CancleButton>
      </RSD.ConfirmBar>
    </RSD.EditStoreDetail>
  );
};

export default RegisterStoreDetail;
