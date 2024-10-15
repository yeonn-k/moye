import Calendar from 'react-calendar';
import { S } from './CalendarWrap.style.ts';

interface MonthListProps {
  selected: string;
  items: { [key: string]: { ACCEPT: number; PENDING: number; CANCEL: number } };
}

const CalendarWrap = ({ selected, items }: MonthListProps) => {
  console.log(selected);

  const tileContent = ({ date }: { date: Date }) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const renderItem = (count: number, Icon: React.FC) =>
      count > 0 && (
        <S.Item>
          <Icon />
          <div>
            {count}
            <S.LilText>건</S.LilText>
          </div>
        </S.Item>
      );

    if (items[dateKey]) {
      const { ACCEPT, PENDING, CANCEL } = items[dateKey];
      return (
        <S.ItemBox>
          {selected === '전체' || selected === '' ? (
            <>
              {renderItem(ACCEPT, S.AcceptIcon)}
              {renderItem(PENDING, S.PendingIcon)}
              {renderItem(CANCEL, S.CancelIcon)}
            </>
          ) : selected === '예약 확정' ? (
            renderItem(ACCEPT, S.AcceptIcon)
          ) : selected === '대기중' ? (
            renderItem(PENDING, S.PendingIcon)
          ) : selected === '예약 취소' ? (
            renderItem(CANCEL, S.CancelIcon)
          ) : (
            ''
          )}
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
