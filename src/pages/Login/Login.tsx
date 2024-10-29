import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { S } from './Login.style';
import { loginService } from '../../services/auth/authService';
import { loginAction, logoutAction } from '../../store/slices/auth/authSlice';
import { validateEmail } from '../../utils/validator';
import ROUTE_LINK from '../../routes/RouterLink';

const Login = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  const [validError, setValidError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [responseError, setResponseError] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  useEffect(() => {
    if (emailInputRef.current && passwordInputRef.current) {
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
      emailInputRef.current.focus();
    }
  }, [responseError]);

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResponseError('');
    setSubmitError('');
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    if (name === 'email') {
      const error = validateEmail(value);
      setValidError(error);
    }
  };

  const handleSubmitButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setResponseError('');
    const { email, password } = userForm;
    const loginForm = { email, password };
    if (email === '' || password === '') {
      setSubmitError('이메일, 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (validError) {
      setSubmitError(validError);
      return;
    }

    try {
      const response = await loginService(loginForm);
      if (response) {
        const loginUser = {
          id: null,
          email: loginForm.email,
          name: null,
          phone: null,
          avatarUrl: null,
        };

        dispatch(
          loginAction({
            user: loginUser,
            isLoggedIn: true,
          }),
        );

        setUserForm({
          email: '',
          password: '',
        });

        navigate(ROUTE_LINK.OWNER.link);
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'Network Error') {
          setResponseError(
            '현재 네트워크 상태가 불안정합니다. 잠시 후 다시 시도해주세요.',
          );
        } else {
          setResponseError(e.message);
        }
      }
    }
  };

  return (
    <S.LoginBox>
      <S.BoxOverlay>
        <S.Logo />
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
              autoComplete="off"
              ref={emailInputRef}
            />
            <S.UserInput
              name="password"
              placeholder="비밀번호"
              type="password"
              value={userForm.password}
              onChange={handleUserFormChange}
              autoComplete="new-password"
              ref={passwordInputRef}
            />
          </S.UserInputBox>
          {submitError && (
            <S.SubmitErrorMessage className={submitError ? 'visible' : ''}>
              {submitError}
            </S.SubmitErrorMessage>
          )}
          {responseError && (
            <S.ResponseErrorMessage className={responseError ? 'visible' : ''}>
              {responseError}
            </S.ResponseErrorMessage>
          )}
          <S.SubmitButton>로그인</S.SubmitButton>
          <S.SignUpPrompt>
            <S.SignUpPromptMessage>계정이 없으신가요?</S.SignUpPromptMessage>
            <S.SignUpPromptLink to={ROUTE_LINK.SIGNUP.link}>
              가입하기
            </S.SignUpPromptLink>
          </S.SignUpPrompt>
        </S.LoginForm>
      </S.BoxOverlay>
    </S.LoginBox>
  );
};

export default Login;
