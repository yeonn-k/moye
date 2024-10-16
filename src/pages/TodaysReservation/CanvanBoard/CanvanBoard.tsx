import { useEffect, useState } from 'react';
import OuterCard from './OuterCard/OuterCard.tsx';

import { S } from './CanvaBoard.style.ts';
import useCheckTheDate from '../../../hooks/useCheckTheDate.tsx';
import dayjs from 'dayjs';

interface CanvanBoardProps {
  items: Items[];
  setIsRerender: React.Dispatch<React.SetStateAction<boolean>>;
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

const CanvanBoard = ({ items, setIsRerender }: CanvanBoardProps) => {
  const [oClock, setOClock] = useState(false);
  const [thirty, setThirty] = useState(false);
  const { hour, minute, second } = useCheckTheDate();
  const [filtered, setFiltered] = useState({
    accept: [] as Items[],
    pending: [] as Items[],
    completed: [] as Items[],
  });

  const checkTime = () => {
    if (minute === 0 && second === 0) {
      setOClock(true);
    } else if (minute === 30 && second === 0) {
      setThirty(true);
    } else {
      setOClock(false);
      setThirty(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
