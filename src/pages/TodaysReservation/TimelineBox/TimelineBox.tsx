import { S } from './TimelineBox';

interface TimelineBoxProps {
  items: Items[];
}

interface Items {
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const TimelineBox = ({ items }: TimelineBoxProps) => {
  const lastNums = (phone: string) => {
    return phone.slice(-4, phone.length);
  };
  return (
    <S.TimelineBox>
      <S.TimeBox>
        <S.Time>10</S.Time>
        <S.Time>11</S.Time>
        <S.Time>12</S.Time>
        <S.Time>13</S.Time>
        <S.Time>14</S.Time>
        <S.Time>15</S.Time>
        <S.Time>16</S.Time>
        <S.Time>17</S.Time>
        <S.Time>18</S.Time>
      </S.TimeBox>
      <S.Grid>
        <S.Cell></S.Cell>
        <S.Cell></S.Cell>
        <S.Cell></S.Cell>
        <S.Cell></S.Cell>
        <S.Cell></S.Cell>
        <S.Cell></S.Cell>
        <S.Cell></S.Cell>
        <S.Cell></S.Cell>

        <S.ItemGrid>
          {items.map((item) => {
            return (
              <S.Item>
                {item.name} ({item.count}명) {lastNums(item.phone)}
              </S.Item>
            );
          })}
        </S.ItemGrid>
      </S.Grid>
    </S.TimelineBox>
  );
};

export default TimelineBox;
