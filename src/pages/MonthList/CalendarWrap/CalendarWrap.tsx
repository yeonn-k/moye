import Calendar from 'react-calendar';
import { S } from './CalendarWrap';

interface MonthListProps {
  selected: string;
  items: { [key: string]: { ACCEPT: number; PENDING: number; CANCEL: number } };
}

const CalendarWrap = ({ selected, items }: MonthListProps) => {
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
          {renderItem(ACCEPT, S.AcceptIcon)}
          {renderItem(PENDING, S.PendingIcon)}
          {renderItem(CANCEL, S.CancelIcon)}
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
