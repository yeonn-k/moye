import { S } from './TimelineBox.style.ts';

interface TimelineBoxProps {
  items: Items[];
  operating: (number | string)[];
}

interface Items {
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const TimelineBox = ({ items, operating }: TimelineBoxProps) => {
  const lastNums = (phone: string) => {
    return phone.slice(-4, phone.length);
  };

  const operatingNum = operating.length > 0 ? operating.length - 1 : 1;

  if (!operating?.length) return null;
  return (
    <S.TimelineBox>
      <S.TimeBox>
        {operating.map((hr, idx) => {
          return idx % 2 === 0 ? (
            <S.Time key={idx}>{hr}</S.Time>
          ) : (
            <S.NoTime key={idx}>{hr}</S.NoTime>
          );
        })}
      </S.TimeBox>

      <S.Grid operatingNum={operatingNum}>
        {operating.slice(0, operatingNum).map((hr, idx) => {
          return <S.Cell key={idx}></S.Cell>;
        })}
        <S.ItemGrid>
          {items.map((item, idx) => {
            const start = () => {
              if (parseInt(item.startTime[3]) !== 0) {
                return parseInt(item.startTime.slice(0, 2)) + 0.5;
              } else return parseInt(item.startTime.slice(0, 2));
            };
            const end = () => {
              if (parseInt(item.endTime[3]) !== 0) {
                return parseInt(item.endTime.slice(0, 2)) + 0.5;
              } else return parseInt(item.endTime.slice(0, 2));
            };

            const startIndex = operating.indexOf(start());
            const endIndex = operating.indexOf(end());

            if (item.status === 'CANCEL') return null;
            return (
              <S.ItemWrap key={idx} operatingNum={operatingNum}>
                <S.Item
                  key={idx}
                  start={startIndex}
                  end={endIndex}
                  status={item.status}
                >
                  {item.name} ({item.count}명) {lastNums(item.phone)}
                </S.Item>
              </S.ItemWrap>
            );
          })}
        </S.ItemGrid>
      </S.Grid>
    </S.TimelineBox>
  );
};

export default TimelineBox;
