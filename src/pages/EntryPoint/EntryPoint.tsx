import { S } from './EntryPoint';

const EntryPoint = () => {
  return (
    <S.EntryPointBox>
      <S.PageTitle>Project Title</S.PageTitle>
      <S.AuthBox>
        <S.LoginButton to="/login">로그인</S.LoginButton>
        <S.SignupButton to="/signup">회원가입</S.SignupButton>
      </S.AuthBox>
    </S.EntryPointBox>
  );
};

export default EntryPoint;
