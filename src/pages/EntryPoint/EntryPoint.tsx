import { S } from './EntryPoint.style';
import ROUTE_LINK from '../../routes/RouterLink';

const EntryPoint = () => {
  return (
    <S.EntryPointBox>
      <S.PageTitle>Project Title</S.PageTitle>
      <S.AuthBox>
        <S.LoginButton to={ROUTE_LINK.LOGIN.link}>로그인</S.LoginButton>
        <S.SignupButton to={ROUTE_LINK.SIGNUP.link}>회원가입</S.SignupButton>
      </S.AuthBox>
    </S.EntryPointBox>
  );
};

export default EntryPoint;
