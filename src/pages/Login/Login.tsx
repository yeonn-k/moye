import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { S } from './Login';
import { loginService } from '../../services/auth/authService';
import { loginAction } from '../../store/slices/auth/authSlice';
// import UserInput from '../../components/common/UserInput/UserInput.tsx';

const Login = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const loginForm = { email, password };
    if (userForm.email === '' || userForm.password === '') {
      return;
    }
    try {
      const response = await loginService(loginForm);
      if (response) {
        const jwtToken = response.data.body.access;
        const decoded: {
          exp: number;
          iat: number;
          id: number;
          jti: string;
          role: string;
        } = jwtDecode(jwtToken);

        const loginUser = {
          id: decoded.id,
          email: loginForm.email,
          name: null,
          phone: null,
          avatarUrl: null,
        };

        console.log(response.data);

        dispatch(
          loginAction({
            token: response.data.body.access,
            user: loginUser,
          }),
        );

        navigate('/owner');
      }
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
