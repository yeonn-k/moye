import { useState, useEffect } from 'react';
import { SD } from './StoreDetail.ts';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ROUTE_LINK from '../../routes/RouterLink.ts';
import {
  StoreDetailData,
  initialState,
  StoreImage,
  RegularHoliday,
} from './StoreDetailInterface.ts';
import OperatingTimeTable from './OperatingTimeTable.tsx';
import { APIS } from '../../config/config.ts';
import { RootState } from '../../store/store.ts';
import baseStoreImage from '../../assets/images/baseStoreImage.png';
import dayjs from 'dayjs';

function mapResToStoreData(res: any) {
  let newData: StoreDetailData = {
    ...res.data.body,
    regularHoliday: res.data.body.regularHoliday.map(
      (item: RegularHoliday) => ({
        closedDay: item.closedDay - 1,
      }),
    ),
  };
  if (
    newData.openingHour[0].startBreakTime === newData.openingHour[0].closeTo &&
    newData.openingHour[0].endBreakTime === newData.openingHour[0].openFrom &&
    newData.openingHour[1].startBreakTime === newData.openingHour[1].closeTo &&
    newData.openingHour[1].endBreakTime === newData.openingHour[1].openFrom
  ) {
    newData.openingHour[0].startBreakTime = '';
    newData.openingHour[0].endBreakTime = '';
    newData.openingHour[1].startBreakTime = '';
    newData.openingHour[1].endBreakTime = '';
  }
  newData.closedDay = newData.closedDay
    .sort((a, b) => {
      return dayjs(a.ymd).diff(b.ymd, 'days');
    })
    .filter((date) => dayjs(new Date()).diff(date.ymd, 'days'));
  return newData;
}

const StoreDetail = () => {
  const [storeData, setStoreData] = useState<StoreDetailData>(initialState);
  const storeId = useSelector((state: RootState) => state.auth.store?.id);
  const [previewImage, setPreviewImage] = useState('');
  const [previousImageFile, setpreviousImageFile] = useState<File | string>('');

  useEffect(() => {
    async function asyncCall() {
      let imageSrc = '';

      await axios
        .get(`${APIS.store}/${storeId}`)
        .then((res) => {
          setStoreData(mapResToStoreData(res));

          imageSrc = res.data.body.image.filter(
            (item: StoreImage) => item.url !== '' && item.url !== null,
          )[0].url;
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
      const getURL = `${APIS.getImageBase}${imageSrc}`;

      await axios
        .get(getURL, {
          responseType: 'blob',
        })
        .then((res) => {
          const newFile = new File([res.data], 'storeImage.jpg', {
            type: 'image/jpeg',
          });
          const reader = new FileReader();
          reader.onload = (event) => {
            const previewImage = String(event.target?.result);
            setPreviewImage(previewImage);
          };
          reader.readAsDataURL(newFile);
          setpreviousImageFile(newFile);
        })
        .catch((error) => {
          console.log('Error: ', error);
          setPreviewImage(baseStoreImage);
        });
    }
    asyncCall();
  }, [storeId]);

  return (
    <SD.Main>
      <SD.TopBar>
        <p>{storeData.name}</p>
        <Link
          to={`${ROUTE_LINK.STOREEDIT.link}${storeId}/edit`}
          state={{
            data: storeData,
            previewImage: previewImage,
            previousImageFile: previousImageFile,
          }}
        >
          <button>편집</button>
        </Link>
      </SD.TopBar>
      <SD.Body>
        <SD.BodyLeft>
          <SD.StoreImageContainer>
            <SD.StoreImage
              src={previewImage}
              alt="storeImage"
              onClick={() => {
                console.log(storeData);
              }}
            />
          </SD.StoreImageContainer>
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
          <OperatingTimeTable
            openingHour={storeData.openingHour}
            regularHoliday={storeData.regularHoliday}
            closedDay={storeData.closedDay}
          />
          <SD.Description>
            <span>소개글</span>
            <div>{storeData.description}</div>
          </SD.Description>
        </SD.BodyRight>
      </SD.Body>
    </SD.Main>
  );
};

export default StoreDetail;
