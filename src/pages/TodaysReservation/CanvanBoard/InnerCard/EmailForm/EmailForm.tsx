import { S } from './EmailForm.style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../../store/store';

interface ItemProps {
  item: Item;
}

interface Item {
  id: number;
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  phone: string;
  status: string;
}

const EmailForm = ({ item }: ItemProps) => {
  const storeName = useSelector(
    (state: RootState) => state.auth.store?.businessName,
  );
  return (
    <S.EmailForm>
      <S.Logo />
      <S.EmailBox>
        <S.MainText>
          안녕하세요, <S.Highlight>{item.name}님!</S.Highlight>
        </S.MainText>
        <S.Context>
          모두의 예약을 돕는 <S.Highlight>MoYe</S.Highlight> 입니다.
          <br />
          {item.name}님,
          <S.Highlight>
            {storeName}의 {item.startTime} 예약이 확정
          </S.Highlight>
          되었습니다.
          <br />
          즐거운 시간 보내시길 바랍니다!
        </S.Context>
      </S.EmailBox>
    </S.EmailForm>
  );
};

export default EmailForm;
