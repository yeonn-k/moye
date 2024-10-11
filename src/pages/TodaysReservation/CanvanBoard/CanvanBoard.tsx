import { S } from './CanvaBoard';
import OuterCard from './OuterCard/OuterCard.tsx';

const CanvanBoard = () => {
  return (
    <S.CanvanBoardBox>
      <OuterCard status={'accept'} />
      <OuterCard status={'pending'} />
      <OuterCard status={'completed'} />
    </S.CanvanBoardBox>
  );
};

export default CanvanBoard;
