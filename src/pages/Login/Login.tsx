import { useState, ChangeEvent, FormEvent } from 'react';
import { S } from './Login';
// import ConfirmButton from '../../components/common/ConfirmButton/ConfirmButton.tsx';
// import UserInput from '../../components/common/UserInput/UserInput.tsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmitButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <S.LoginBox>
      <S.PageTitle>Project Title</S.PageTitle>
      <S.LoginForm onSubmit={handleSubmitButtonClick}>
        <S.FormTitle>로그인</S.FormTitle>
        <S.UserInputBox>
          {/* <UserInput width="260px" height="40px" placeholder="이메일" />
          <UserInput width="260px" height="40px" placeholder="비밀번호" /> */}
          <S.UserInput
            name="email"
            placeholder="이메일"
            type="email"
            value={email}
            onChange={handleInputChange}
          />
          <S.UserInput
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={handleInputChange}
          />
        </S.UserInputBox>
        {/* <ConfirmButton action="confirm" /> */}
        <S.SubmitButton>로그인</S.SubmitButton>
        <S.SignUpPrompt>
          <S.SignUpPromptMessage>계정이 없으신가요?</S.SignUpPromptMessage>
          <S.SignUpPromptLink to="/signup">가입하기</S.SignUpPromptLink>
        </S.SignUpPrompt>
      </S.LoginForm>
    </S.LoginBox>
  );
};

export default Login;
