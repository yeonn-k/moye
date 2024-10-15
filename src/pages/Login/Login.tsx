import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { S } from './Login.style';
import { loginService } from '../../services/auth/authService';
import { loginAction } from '../../store/slices/auth/authSlice';
import { validateEmail } from '../../utils/validator';

const Login = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  // 이메일 입력 검증 에러 메시지
  const [validError, setValidError] = useState('');
  // TODO: 로그인 요청 후 이메일, 비밀번호 일치 검증 에러 메시지
  // const [responseError, setResponseError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'email') {
      const error = validateEmail(value);
      setValidError(error);
    } else {
      setValidError('');
    }
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
          {validError && (
            <S.ErrorMessage className={validError ? 'visible' : ''}>
              {validError}
            </S.ErrorMessage>
          )}
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
