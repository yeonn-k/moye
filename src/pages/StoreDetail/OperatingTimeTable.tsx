import { useState, useEffect } from 'react';
import { T } from './OperatingTimeTable.ts';
import {
  OperatingTimeTableData,
  IrregularCloseDay,
  RegularHoliday,
} from './StoreDetailInterface.ts';
import dayjs from 'dayjs';

interface OperatingTimeTableProps {
  openingHour: OperatingTimeTableData[];
  regularHoliday: RegularHoliday[];
  closedDay: IrregularCloseDay[];
}

const initialState: OperatingTimeTableData = {
  type: '',
  openFrom: '',
  closeTo: '',
  startBreakTime: '',
  endBreakTime: '',
};

const dayOfTheWeeks = [
  '',
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const OperatingTimeTable = ({
  openingHour,
  regularHoliday,
  closedDay,
}: OperatingTimeTableProps) => {
  const [weekday, setWeekday] = useState<OperatingTimeTableData>(initialState);
  const [weekend, setWeekend] = useState<OperatingTimeTableData>(initialState);

  useEffect(() => {
    if (openingHour.length > 1) {
      setWeekday(openingHour.filter((item) => item.type === '평일')[0]);
      setWeekend(openingHour.filter((item) => item.type === '주말')[0]);
    }
  }, [openingHour]);

  return (
    <T.OperatingTimeTable>
      <thead>
        <tr>
          <th></th>
          <th>운영 시간</th>
          <th>휴식 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>평일</td>
          <td>
            {weekday.openFrom.substring(0, 5)} ~{' '}
            {weekday.closeTo.substring(0, 5)}
          </td>
          <td>
            {weekday.startBreakTime.substring(0, 5)} ~{' '}
            {weekday.endBreakTime.substring(0, 5)}
          </td>
        </tr>
        <tr>
          <td>주말</td>
          <td>
            {weekend.openFrom.substring(0, 5)} ~{' '}
            {weekend.closeTo.substring(0, 5)}
          </td>
          <td>
            {weekend.startBreakTime.substring(0, 5)} ~{' '}
            {weekend.endBreakTime.substring(0, 5)}
          </td>
        </tr>
        <tr>
          <td>휴무일</td>
          <td>
            {regularHoliday.map((day) => (
              <p>{dayOfTheWeeks[day.closedDay]}</p>
            ))}
          </td>
          <td>
            {closedDay.map((date) => {
              if (dayjs(date.ymd).diff(dayjs(new Date()), 'days') >= 0) {
                return <p>{date.ymd}</p>;
              }
            })}
          </td>
        </tr>
      </tbody>
    </T.OperatingTimeTable>
  );
};

export default OperatingTimeTable;
