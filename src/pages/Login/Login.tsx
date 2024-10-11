import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { S } from './Login';
import { loginService } from '../../services/auth/authService';
import { loginAction } from '../../store/slices/auth/authSlice';
// import ConfirmButton from '../../components/common/ConfirmButton/ConfirmButton.tsx';
// import UserInput from '../../components/common/UserInput/UserInput.tsx';

const Login = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userForm;
    if (userForm.email === '' || userForm.password === '') {
      return;
    }
    try {
      // TODO: DB 연결 후 테스트 필요
      const response = await loginService(email, password);
      dispatch(
        loginAction({
          token: response.data.body.access,
          user: response.data.body.user,
        }),
      );
    } catch (e) {
      console.error(e);
    }
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
            value={userForm.email}
            onChange={handleUserFormChange}
          />
          <S.UserInput
            name="password"
            placeholder="비밀번호"
            type="password"
            value={userForm.password}
            onChange={handleUserFormChange}
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
