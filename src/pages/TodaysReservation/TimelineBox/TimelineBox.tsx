import { S } from './TimelineBox.style.ts';

interface TimelineBoxProps {
  items: Items[];
  operating: number[];
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

  if (!operating || operating.length === 0) return null;
  return (
    <S.TimelineBox>
      <S.TimeBox>
        {operating.map((hr, idx) => {
          return <S.Time key={idx}>{hr}</S.Time>;
        })}
      </S.TimeBox>

      <S.Grid operatingNum={operatingNum}>
        {operating.slice(0, operatingNum).map((hr, idx) => {
          return <S.Cell key={idx}></S.Cell>;
        })}
        <S.ItemGrid>
          {items.map((item, idx) => {
            const start = parseInt(item.startTime.slice(0, 2));
            const end = parseInt(item.endTime.slice(0, 2));

            const startIndex = operating.indexOf(start);
            const endIndex = operating.indexOf(end);

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
