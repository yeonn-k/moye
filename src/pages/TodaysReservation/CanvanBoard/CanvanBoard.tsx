import { useEffect, useState } from 'react';
import OuterCard from './OuterCard/OuterCard.tsx';

import { S } from './CanvaBoard.style.ts';

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
  const [filtered, setFiltered] = useState({
    accept: [] as Items[],
    pending: [] as Items[],
    cancel: [] as Items[],
  });

  useEffect(() => {
    items.map((item: Items) => {
      const newFiltered = {
        accept: [] as Items[],
        pending: [] as Items[],
        cancel: [] as Items[],
      };

      items.forEach((item: Items) => {
        if (item.status === 'ACCEPT') {
          newFiltered.accept.push(item);
        }
        if (item.status === 'PENDING') {
          newFiltered.pending.push(item);
        }
        if (item.status === 'CANCEL') {
          newFiltered.cancel.push(item);
        }
      });

      setFiltered(newFiltered);

      console.log(newFiltered);
    });
  }, [items]);

  console.log(filtered);

  return (
    <S.CanvanBoardBox>
      <OuterCard status={'accept'} filtered={filtered.accept} />
      <OuterCard status={'pending'} filtered={filtered.pending} />
      <OuterCard status={'completed'} filtered={filtered.cancel} />
    </S.CanvanBoardBox>
  );
};

export default CanvanBoard;
