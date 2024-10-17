import { useEffect, useState } from 'react';
import OuterCard from './OuterCard/OuterCard.tsx';

import { S } from './CanvaBoard.style.ts';
import useCheckTheDate from '../../../hooks/useCheckTheDate.tsx';

interface CanvanBoardProps {
  items: Items[];
  setIsRerender: React.Dispatch<React.SetStateAction<boolean>>;
  oClock: boolean;
  thirty: boolean;
}

interface Items {
  id: number;
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const CanvanBoard = ({
  items,
  setIsRerender,
  oClock,
  thirty,
}: CanvanBoardProps) => {
  const { hour, minute } = useCheckTheDate();
  const [filtered, setFiltered] = useState({
    accept: [] as Items[],
    pending: [] as Items[],
    completed: [] as Items[],
  });

  useEffect(() => {
    items.forEach((item: Items) => {
      const newFiltered = {
        accept: [] as Items[],
        pending: [] as Items[],
        completed: [] as Items[],
      };

      items.forEach((item: Items) => {
        const start = () => {
          if (parseInt(item.startTime[3]) !== 0) {
            return parseInt(item.startTime.slice(0, 2)) + 0.5;
          } else return parseInt(item.startTime.slice(0, 2));
        };

        const now = () => {
          if (minute >= 30) {
            return hour + 0.5;
          } else return hour;
        };

        if (item.status === 'ACCEPT' && start() <= now()) {
          newFiltered.completed.push(item);
        } else if (item.status === 'ACCEPT') {
          newFiltered.accept.push(item);
        } else if (item.status === 'PENDING') {
          newFiltered.pending.push(item);
        }
      });

      setFiltered(newFiltered);
    });
  }, [items, oClock, thirty, hour]);

  return (
    <S.CanvanBoardBox>
      <OuterCard
        status={'accept'}
        filtered={filtered.accept}
        setIsRerender={setIsRerender}
        oClock={oClock}
        thirty={thirty}
      />
      <OuterCard
        status={'pending'}
        filtered={filtered.pending}
        setIsRerender={setIsRerender}
        oClock={oClock}
        thirty={thirty}
      />
      <OuterCard
        status={'completed'}
        filtered={filtered.completed}
        setIsRerender={setIsRerender}
        oClock={oClock}
        thirty={thirty}
      />
    </S.CanvanBoardBox>
  );
};

export default CanvanBoard;
