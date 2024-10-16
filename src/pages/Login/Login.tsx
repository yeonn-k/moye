import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { S } from './Login.style';
import { loginService } from '../../services/auth/authService';
import { loginAction, logoutAction } from '../../store/slices/auth/authSlice';
import { validateEmail } from '../../utils/validator';

const Login = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  const [validError, setValidError] = useState('');
  const [responseError, setResponseError] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResponseError('');
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

        setUserForm({
          email: '',
          password: '',
        });

        navigate('/owner');
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        setResponseError(e.message);
        emailRef?.current?.focus();
      }
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
            value={userForm.email}
            onChange={handleUserFormChange}
            ref={emailRef}
          />
          <S.UserInput
            name="password"
            placeholder="비밀번호"
            type="password"
            value={userForm.password}
            onChange={handleUserFormChange}
            autoComplete="current-password"
          />
        </S.UserInputBox>
        {responseError && (
          <S.ErrorMessage className={responseError ? 'visible' : ''}>
            {responseError}
          </S.ErrorMessage>
        )}
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
