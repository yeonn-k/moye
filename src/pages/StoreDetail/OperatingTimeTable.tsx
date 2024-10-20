import { useState, useEffect, useMemo } from 'react';
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

  const weekdayOpen = useMemo(() => {
    return `${weekday.openFrom.substring(0, 5)} ~ ${weekday.closeTo.substring(0, 5)}`;
  }, [weekday]);
  const weekdayBreak = useMemo(() => {
    return `${weekday.startBreakTime.substring(0, 5)} ~ ${weekday.endBreakTime.substring(0, 5)}`;
  }, [weekday]);
  const weekendOpen = useMemo(() => {
    return `${weekend.openFrom.substring(0, 5)} ~ ${weekend.closeTo.substring(0, 5)}`;
  }, [weekend]);
  const weekendBreak = useMemo(() => {
    return `${weekend.startBreakTime.substring(0, 5)} ~ ${weekend.endBreakTime.substring(0, 5)}`;
  }, [weekend]);

  useEffect(() => {
    if (openingHour.length > 1) {
      setWeekday(openingHour.filter((item) => item.type === '평일')[0]);
      setWeekend(openingHour.filter((item) => item.type === '주말')[0]);
    }
  }, [openingHour]);

  return (
    <T.OperationTimeTalbeContainer>
      <T.OperatingTimeTable>
        <thead>
          <tr>
            <T.LeftHeader></T.LeftHeader>
            <th>운영 시간</th>
            <th>휴식 시간</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <T.LeftCol>평일</T.LeftCol>
            <td>{weekdayOpen}</td>
            <td>{weekdayBreak.length > 3 ? weekdayBreak : '없음'}</td>
          </tr>
          <tr>
            <T.LeftCol>주말</T.LeftCol>
            <td>{weekendOpen}</td>
            <td>{weekendBreak.length > 3 ? weekendBreak : '없음'}</td>
          </tr>
          <tr>
            <T.LeftCol>
              <T.RegularHoliday>정기휴일</T.RegularHoliday>
            </T.LeftCol>
            <td colSpan={2}>
              매주&nbsp;
              {regularHoliday
                .map((day) => dayOfTheWeeks[day.closedDay])
                .join(', ')}
            </td>
          </tr>
          <tr>
            <T.LeftCol>
              <T.IrregularHoliday>비정기 휴일</T.IrregularHoliday>
            </T.LeftCol>
            <td colSpan={2}>
              {closedDay
                .map((date) => {
                  if (dayjs(date.ymd).diff(dayjs(new Date()), 'days') >= 0) {
                    return date.ymd;
                  }
                })
                .join(', ')}
            </td>
          </tr>
        </tbody>
      </T.OperatingTimeTable>
    </T.OperationTimeTalbeContainer>
  );
};

export default OperatingTimeTable;
