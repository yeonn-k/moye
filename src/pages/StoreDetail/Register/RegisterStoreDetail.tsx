import React, { useState } from 'react';
import { RSD } from './RegisterStoreDetail.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListInputElement from '../Edit/ListInputElement.tsx';
import ListTimeElement from '../Edit/ListTimeElement.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import ROUTE_LINK from '../../../routes/RouterLink.ts';
import { APIS } from '../../../config/config.ts';
import baseUploadImage from '../../../assets/images/baseUploadImage.png';

// interface localStorageData {
//   token: string;
//   user: {
//     id: number;
//     email: string;
//     name: string;
//     phone: string;
//     stores: string;
//     avatarUrl: string;
//   };
// }

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

const TIME_SUBFIX = ':00';

const dayOfTheWeeks = ['일', '월', '화', '수', '목', '금', '토'];

function addTimeSubfix(time: string) {
  return time + TIME_SUBFIX;
}

const RegisterStoreDetail = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialState);
  const [uploadedImage, setUploadedImage] = useState<File | string>('');
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [regularClosedDays, setRegularClosedDays] = useState<number[]>([]);

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
  // const handleSetTab = (e: any) => {
  //   if (e.key === 'Tab') {
  //     e.preventDefault();
  //     setInputs({ ...inputs, description: inputs.description + '\t' });
  //   }
  // };
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
  const handlePostFormSubmit = async () => {
    try {
      const formData = new FormData();
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
          console.log(res.data);
          console.log('매장등록성공');
        })
        .catch((error) => {
          console.log('Error: ', error);
          alert('매장 등록에 실패했습니다.');
        });
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      navigate(ROUTE_LINK.OWNER.link);
    }
  };
  const handleCancleFormClick = () => {
    if (window.confirm('취소하시겠습니까?')) {
      navigate(`${ROUTE_LINK.OWNER.link}`);
    }
  };

  return (
    <RSD.EditStoreDetail>
      <RSD.TopBar>매장 등록</RSD.TopBar>
      <RSD.Body>
        <RSD.BodyLeft>
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
                <textarea
                  value={inputs.description}
                  id="description"
                  onChange={handleTextareaChange}
                />
              </div>
            </li>
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
          </ul>
        </RSD.BodyLeft>
        <RSD.BodyRight>
          <ul>
            <li>
              <div>
                <img
                  src={imagePreview ? imagePreview : baseUploadImage}
                  alt="storeImage"
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
          </ul>
        </RSD.BodyRight>
      </RSD.Body>
      <RSD.ConfirmBar>
        <button onClick={handlePostFormSubmit}>확인</button>
        <button onClick={handleCancleFormClick}>취소</button>
      </RSD.ConfirmBar>
    </RSD.EditStoreDetail>
  );
};

export default RegisterStoreDetail;
