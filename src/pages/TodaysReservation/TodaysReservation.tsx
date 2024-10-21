import { useEffect, useState } from 'react';

import TimelineBox from './TimelineBox/TimelineBox.tsx';
import CanvanBoard from './CanvanBoard/CanvanBoard.tsx';
import UserInput from '../../components/common/UserInput/UserInput.tsx';

import axios from 'axios';
import { APIS } from '../../config/config.ts';

import useCheckTheDate from '../../hooks/useCheckTheDate.tsx';
import useInputValue from '../../hooks/useInputValue.tsx';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

import { S } from './TodaysReservation.style.ts';

interface Items {
  id: number;
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
  email: string;
}

const TodaysReservation = () => {
  // const storeId = useSelector((state: RootState) => state.auth.store?.id);
  const storeName = useSelector(
    (state: RootState) => state.auth.store?.businessName,
  );
  const storeId = 3;

  const [items, setItems] = useState<Items[]>([]);
  const { month, date, days, day, minute, second } = useCheckTheDate();
  const [businessHrs, setBusinessHrs] = useState({
    open: '',
    close: '',
  });
  const [inputValue, setInputValue] = useInputValue();
  const [operating, setOperating] = useState<(number | string)[]>([]);
  const [isRerender, setIsRerender] = useState(false);

  const [oClock, setOClock] = useState(false);
  const [thirty, setThirty] = useState(false);

  const getTodaysReservation = async () => {
    try {
      const res = await axios.get(`${APIS.store}/${storeId}/reservations`);

      setItems(res.data.body.reservations);
      setBusinessHrs({
        open: res.data.body.open,
        close: res.data.body.close,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const checkTime = () => {
    if (minute === 0 && second === 0) {
      setOClock(true);
      setIsRerender(true);
    } else if (minute === 30 && second === 0) {
      setThirty(true);
      setIsRerender(true);
    } else {
      setOClock(false);
      setThirty(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTime, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getTodaysReservation();
  }, []);

  const autoRerendering = async () => {
    await getTodaysReservation();
    setIsRerender(false);
  };

  useEffect(() => {
    autoRerendering();
  }, [isRerender]);

  const filteredItems: Items[] = items.filter((item) => {
    const nomalizedInput = inputValue.normalize('NFD').toLowerCase();
    const nomalizedName = item.name.normalize('NFD').toLowerCase();
    const nomalizedPhone = item.phone.normalize('NFD').toLowerCase();

    return (
      nomalizedName.includes(nomalizedInput) ||
      nomalizedPhone.includes(nomalizedInput)
    );
  });

  const openTime = () => {
    const open = parseInt(businessHrs.open.slice(0, 2));

    const checkClose = () => {
      return parseInt(businessHrs.close.slice(0, 2));
    };

    const close = checkClose();

    const newOperating: (number | string)[] = [];
    for (let i = open; i <= close; i++) {
      if (i < close) {
        newOperating.push(i);
        newOperating.push(i + 0.5);
      } else newOperating.push(i);
    }

    setOperating(newOperating);
  };

  useEffect(() => {
    openTime();
  }, [businessHrs]);

  return (
    <S.TodaysReservation>
      <S.TitleBox>
        <S.StoreName>{storeName}</S.StoreName>
      </S.TitleBox>
      <S.UpperBox>
        <S.FlexBox>
          <div>
            <S.Todays>오늘의 예약</S.Todays>
            <S.Date>{`${month}월 ${date}일 ${days[day]}요일`}</S.Date>
          </div>
          <S.InputBox>
            <S.SearchIcon />
            <UserInput
              placeholder="예약자명을 입력하세요"
              width="220px"
              color="white"
              height="25px"
              value={inputValue}
              onChange={setInputValue}
            />
          </S.InputBox>
        </S.FlexBox>
        <S.TimelineBox>
          <TimelineBox items={filteredItems} operating={operating} />
        </S.TimelineBox>
      </S.UpperBox>
      <CanvanBoard
        items={filteredItems}
        setIsRerender={setIsRerender}
        oClock={oClock}
        thirty={thirty}
      />
    </S.TodaysReservation>
  );
};

export default TodaysReservation;
