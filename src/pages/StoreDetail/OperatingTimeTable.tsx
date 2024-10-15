import { T } from './OperatingTimeTable.ts';
import timeData from './storeIrregularClosedDays.json';

/*
interface IrregularClosedDays {
  date: string;
}

interface OperatingTimeTableProps {
  weekdayOpeningHour: string;
  weekdayClosingHour: string;
  weekendOpeningHour: string;
  weekendClosedHour: string;
  weekdayBreakStart: string;
  weekdayBreakEnd: string;
  weekendBreakStart: string;
  weekendBreakEnd: string;
  regularClosedDays: number[];
  irregularClosedDays: IrregularClosedDays[];
}

{
  weekdayOpeningHour,
  weekdayClosingHour,
  weekendOpeningHour,
  weekendClosedHour,
  weekdayBreakStart,
  weekdayBreakEnd,
  weekendBreakStart,
  weekendBreakEnd,
  regularClosedDays,
  irregularClosedDays,
}: OperatingTimeTableProps
*/

const dayOfTheWeeks = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
];

const OperatingTimeTable = () => {
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
            {timeData.weekdayOpeningHour} ~ {timeData.weekdayClosingHour}
          </td>
          <td>
            {timeData.weekdayBreakStart} ~ {timeData.weekdayBreakEnd}
          </td>
        </tr>
        <tr>
          <td>주말</td>
          <td>
            {timeData.weekendOpeningHour} ~ {timeData.weekendClosedHour}
          </td>
          <td>
            {timeData.weekendBreakStart} ~ {timeData.weekendBreakEnd}
          </td>
        </tr>
        <tr>
          <td>휴무일</td>
          <td>
            {timeData.regularClosedDays.map((day) => (
              <p>{dayOfTheWeeks[day]}</p>
            ))}
          </td>
          <td>
            {timeData.irregularClosedDays.map((closed) => (
              <p>{closed.date.substring(5)}</p>
              // TODO: 날짜 라이브러리 도입 후 날짜 비교 로직 추가
            ))}
          </td>
        </tr>
      </tbody>
    </T.OperatingTimeTable>
  );
};

export default OperatingTimeTable;
