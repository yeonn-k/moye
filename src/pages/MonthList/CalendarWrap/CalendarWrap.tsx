import Calendar from 'react-calendar';
import { S } from './CalendarWrap';

interface ItemMap {
  [key: string]: { accept: number; pending: number; cancel: number };
}

const CalendarWrap = () => {
  const items: ItemMap = {
    '2024-10-11': { accept: 2, pending: 3, cancel: 1 },
    '2024-10-14': { accept: 2, pending: 3, cancel: 1 },
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dateKey = date.toISOString().split('T')[0];
    if (items[dateKey]) {
      const { accept, pending, cancel } = items[dateKey];
      return (
        <S.ItemBox>
          <S.Item>
            <S.AcceptIcon />
            <div>
              {accept}
              <S.LilText>건</S.LilText>
            </div>
          </S.Item>
          <S.Item>
            <S.PendingIcon />
            <div>
              {pending}
              <S.LilText>건</S.LilText>
            </div>
          </S.Item>
          <S.Item>
            <S.CancelIcon />
            <div>
              {cancel}
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
