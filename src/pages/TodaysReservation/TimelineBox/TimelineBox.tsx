import Timeline, { DateHeader } from 'react-calendar-timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';

interface Group {
  id: number;
  title: string;
}

interface Item {
  id: number;
  group: number;
  title: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
  canMove?: boolean;
  canResize?: boolean;
  canChangeGroup?: boolean;
  itemProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
}

const groups: Group[] = [{ id: 1, title: '예약자 id' }];

const items: Item[] = [
  {
    id: 1,
    group: 1,
    title: 'name, ppl, phone',
    start_time: moment().set({ hour: 13 }),
    end_time: moment().set({ hour: 14 }),
    canMove: false,
    canResize: false,
    canChangeGroup: false,

    itemProps: {
      className: 'id값',
      style: {
        background: 'fuchsia',
      },
    },
  },
];

const TimelineBox = () => {
  const defaultTimeStart = moment().set({ hour: 10 });
  const defaultTimeEnd = moment().set({ hour: 19 });

  const visibleTimeStart = defaultTimeStart.valueOf();
  const visibleTimeEnd = defaultTimeEnd.valueOf();

  const handleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number,
    updateScrollCanvas: (start: number, end: number) => void,
  ) => {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      visibleTimeStart={visibleTimeStart}
      visibleTimeEnd={visibleTimeEnd}
      onTimeChange={handleTimeChange}
      // timeSteps={{
      //   second: 0,
      //   minute: 0,
      //   hour: 1,
      //   day: 0,
      //   month: 0,
      //   year: 0,
      // }}

      buffer={1}
      sidebarWidth={0}
      lineHeight={48}
      itemHeightRatio={0.8}
    >
      <DateHeader
        unit="hour" // 시간 단위로 헤더 표시
        labelFormat="HH" // 시간을 HH 형식으로 표시
      />
    </Timeline>
  );
};

export default TimelineBox;
