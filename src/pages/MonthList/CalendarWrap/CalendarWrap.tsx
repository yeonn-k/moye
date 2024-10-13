import Calendar from 'react-calendar';
import { S } from './CalendarWrap';
import axios from 'axios';
import { URL } from '../../../config/config';
import { useEffect, useState } from 'react';

interface ItemMap {
  [key: string]: { accept: number; pending: number; cancel: number };
}

interface MonthListProps {
  year: number;
  month: number;
  date: number;
}

const CalendarWrap = ({ year, month, date }: MonthListProps) => {
  const storeId = 1;
  const [items, setItems] = useState<ItemMap>({});

  const getItems = async (month: number) => {
    try {
      const res = await axios.get(
        `${URL}/reservations/${storeId}/stores?month=${month}`,
      );
      console.log(res);
      setItems(res.body);
    } catch (err) {
      console.error('❌ getMonthlyList: ', err);
    }
  };

  useEffect(() => {
    getItems(month);
  }, []);

  const tileContent = () => {
    const dateKey = `${year}-${month}-${date}`;

    if (items[dateKey]) {
      const { ACCEPT, PENDING, CANCEL } = items[dateKey];
      return (
        <S.ItemBox>
          <S.Item>
            <S.AcceptIcon />
            <div>
              {ACCEPT}
              <S.LilText>건</S.LilText>
            </div>
          </S.Item>
          <S.Item>
            <S.PendingIcon />
            <div>
              {PENDING}
              <S.LilText>건</S.LilText>
            </div>
          </S.Item>
          <S.Item>
            <S.CancelIcon />
            <div>
              {CANCEL}
              <S.LilText>건</S.LilText>
            </div>
          </S.Item>
        </S.ItemBox>
      );
    }

    return null;
  };

  return (
    <S.CalendarBox>
      <Calendar
        showNavigation={false}
        locale="en"
        calendarType="hebrew"
        tileContent={tileContent}
      />
    </S.CalendarBox>
  );
};

export default CalendarWrap;
