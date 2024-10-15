import { useEffect, useState } from 'react';
import OuterCard from './OuterCard/OuterCard.tsx';

import { S } from './CanvaBoard.style.ts';
import useCheckTheDate from '../../../hooks/useCheckTheDate.tsx';
import dayjs from 'dayjs';

interface CanvanBoardProps {
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

const CanvanBoard = ({ items }: CanvanBoardProps) => {
  const [oClock, setOClock] = useState(false);
  const { hour, minute, second } = useCheckTheDate();
  const [filtered, setFiltered] = useState({
    accept: [] as Items[],
    pending: [] as Items[],
    completed: [] as Items[],
  });

  const checkOClock = () => {
    const now = dayjs();
    if (now.minute() === 0 && now.second() === 0) {
      setOClock(true);
    } else {
      setOClock(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(checkOClock, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    items.map((item: Items) => {
      const newFiltered = {
        accept: [] as Items[],
        pending: [] as Items[],
        completed: [] as Items[],
      };

      items.forEach((item: Items) => {
        if (
          item.status === 'ACCEPT' &&
          parseInt(item.startTime.slice(0, 2)) < hour
        ) {
          newFiltered.completed.push(item);
        } else if (item.status === 'ACCEPT') {
          newFiltered.accept.push(item);
        } else if (item.status === 'PENDING') {
          newFiltered.pending.push(item);
        }
      });

      setFiltered(newFiltered);
    });
  }, [items]);

  useEffect(() => {
    if (oClock) {
      const newFiltered = {
        accept: [] as Items[],
        pending: [] as Items[],
        completed: [] as Items[],
      };

      items.forEach((item: Items) => {
        if (
          item.status === 'ACCEPT' &&
          parseInt(item.startTime.slice(0, 2)) < hour
        ) {
          newFiltered.completed.push(item);
        } else if (item.status === 'ACCEPT') {
          newFiltered.accept.push(item);
        } else if (item.status === 'PENDING') {
          newFiltered.pending.push(item);
        }
      });

      setFiltered(newFiltered);
    }
  }, [oClock, hour, items]);

  return (
    <S.CanvanBoardBox>
      <OuterCard status={'accept'} filtered={filtered.accept} />
      <OuterCard status={'pending'} filtered={filtered.pending} />
      <OuterCard status={'completed'} filtered={filtered.completed} />
    </S.CanvanBoardBox>
  );
};

export default CanvanBoard;
