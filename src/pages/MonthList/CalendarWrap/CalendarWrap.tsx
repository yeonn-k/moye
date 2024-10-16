import Calendar from 'react-calendar';
import { S } from './CalendarWrap.style.ts';

interface MonthListProps {
  selected: string;
  items: { [key: string]: { ACCEPT: number; PENDING: number; CANCEL: number } };
}

const CalendarWrap = ({ selected, items }: MonthListProps) => {
  const disabledTiles = () => {
    return;
  };
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
        <>
          {selected === '전체' || selected === '' ? (
            <S.ItemBox>
              {renderItem(ACCEPT, S.AcceptIcon)}
              {renderItem(PENDING, S.PendingIcon)}
              {renderItem(CANCEL, S.CancelIcon)}
            </S.ItemBox>
          ) : selected === '예약 확정' && ACCEPT > 0 ? (
            <S.ItemBox>{renderItem(ACCEPT, S.AcceptIcon)}</S.ItemBox>
          ) : selected === '대기중' && PENDING > 0 ? (
            <S.ItemBox>{renderItem(PENDING, S.PendingIcon)}</S.ItemBox>
          ) : selected === '예약 취소' && CANCEL > 0 ? (
            <S.ItemBox>{renderItem(CANCEL, S.CancelIcon)}</S.ItemBox>
          ) : (
            ''
          )}
        </>
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
        onClickDay={disabledTiles}
      />
    </S.CalendarBox>
  );
};

export default CalendarWrap;
