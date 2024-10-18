// import { S } from './EmailForm.style';
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
  return `<div style="margin: 0 auto; padding: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #fff; width: 600px; height: 400px; border-radius: 5px; border: 6px solid #A8E1B2;">
       <div style="background-image: url('/LogoGreen.svg'); background-repeat: no-repeat; background-size: contain; width: 100px; height: 42px; margin-left: 10px; margin-bottom: 34px;"></div>        <div style="font-size: 20px; margin-bottom: 20px; text-align: center;">
          안녕하세요, <span style="color: #3C9A5D; font-weight: 600;">${item.name}님!</span>
        </div>
        <div style="line-height: 30px;">
          모두의 예약을 돕는 <span style="color: #3C9A5D; font-weight: 600;">MoYe</span> 입니다.<br />
          ${item.name}님, <span style="color: #3C9A5D; font-weight: 600;">${storeName}의 ${item.startTime} 예약이 확정</span> 되었습니다.<br />
          즐거운 시간 보내시길 바랍니다!
          </div>
        </div>
      `;
};

export default EmailForm;

// <S.EmailForm>
//   <S.Logo />
//   <S.EmailBox>
//     <S.MainText>
//       안녕하세요, <S.Highlight>{item.name}님!</S.Highlight>
//     </S.MainText>
//     <S.Context>
//       모두의 예약을 돕는 <S.Highlight>MoYe</S.Highlight> 입니다.
//       <br />
//       {item.name}님,
//       <S.Highlight>
//         {storeName}의 {item.startTime} 예약이 확정
//       </S.Highlight>
//       되었습니다.
//       <br />
//       즐거운 시간 보내시길 바랍니다!
//     </S.Context>
//   </S.EmailBox>
// </S.EmailForm>
