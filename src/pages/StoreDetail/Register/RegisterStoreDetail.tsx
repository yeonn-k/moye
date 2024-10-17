import React, { useState } from 'react';
import { RSD } from './RegisterStoreDetail.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListInputElement from '../Edit/ListInputElement.tsx';
import ListTimeElement from '../Edit/ListTimeElement.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import ROUTE_LINK from '../../../routes/RouterLink.ts';
import { APIS } from '../../../config/config.ts';

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
      let storeId = '';
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
      const postData = {
        businessRegistrationNumber: inputs.businessNumber,
        businessName: inputs.businessName,
        name: inputs.name,
        address: inputs.address,
        contact: inputs.contact,
        totalSeats: inputs.totalSeats,
        numberPerTable: inputs.numberPerTable,
        openingHour: openingHourData,
        dayOfWeekDay: regularClosedDays.map((index: number) => index + 1),
      };
      // backend에서 요일을 일=1, 월=2 ~ 토=7으로 받음, front에서는 0~6으로 배정됨

      await axios
        .post(APIS.store, JSON.stringify(postData), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log('매장 등록 완료');
          storeId = res.data.body.id;
          console.log('in: ', res.data.body.id);
        })
        .catch((error) => {
          alert('매장 등록에 실패하였습니다.');
          console.log('Error: ', error);
        });
      formData.append('files', uploadedImage);
      await axios
        .post(`${APIS.storePictureUpload}/${storeId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('사진 업로드 성공');
          navigate(ROUTE_LINK.OWNER.link);
        })
        .catch((error) => {
          alert('사진 업로드에 실패했습니다.');
          console.log('Error: ', error);
        });
    } catch (error) {
      console.log('Error: ', error);
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
              value=""
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="사업자 번호"
              type="text"
              id="businessNumber"
              value=""
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="상호명"
              type="text"
              id="businessName"
              value=""
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="주소"
              type="text"
              id="address"
              value=""
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="전화번호"
              type="text"
              id="contact"
              value=""
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="좌석 수"
              type="text"
              id="totalSeats"
              value=""
              onChange={handleStoreDetailsInput}
            />
            <ListInputElement
              label="테이블 최대 인원"
              type="text"
              id="numberPerTable"
              value=""
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
          </ul>
        </RSD.BodyLeft>
        <RSD.BodyRight>
          <ul>
            <li>
              <div>
                <img
                  src={imagePreview ? imagePreview : ''}
                  alt="imagePreview"
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
