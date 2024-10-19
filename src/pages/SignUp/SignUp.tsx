import { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './SignUp.style';
import { signUpService } from '../../services/auth/authService';
import { validateForm } from '../../utils/validator';
import ROUTE_LINK from '../../routes/RouterLink';

const SignUp = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });

  const [validErrors, setValidErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });

  const [submitError, setSubmitError] = useState(false);
  const [responseError, setResponseError] = useState('');

  const emailInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitError(false);
    const { name, value } = e.target;
    const error = validateForm(name, value, userForm);

    setUserForm((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    setValidErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleResetForm = (e: ChangeEvent<HTMLInputElement>) => {
    setResponseError('');
    setSubmitError(false);
    e.preventDefault();
    setUserForm({
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
    });
    setValidErrors({
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
    });
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  const handleSubmitButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, passwordConfirm, name, phone } = userForm;
    const signUpForm = { email, password, name, phone };
    const hasErrors = Object.values(validErrors).some((error) => error !== '');

    if (hasErrors) {
      setSubmitError(true);
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    if (!email || !password || !passwordConfirm || !name || !phone) {
      setSubmitError(true);
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    try {
      const response = await signUpService(signUpForm);
      if (response) {
        navigate(ROUTE_LINK.LOGIN.link);
      }
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'Network Error') {
          setResponseError(
            '현재 네트워크 상태가 불안정합니다. 잠시 후 다시 시도해주세요.',
          );
        } else {
          console.error(e.message);
          setResponseError(e.message);
        }
      }
    }
  };

  return (
    <S.SignUpBox>
      <S.BoxOverlay>
        <S.Logo />
        <S.SignUpForm onSubmit={handleSubmitButtonClick}>
          <S.FormTitle>회원 가입</S.FormTitle>
          <S.UserInputBox>
            <S.UserInputLabel>
              <span>이메일*</span>
              <S.ErrorMessage className={validErrors.email ? 'visible' : ''}>
                {validErrors.email}
              </S.ErrorMessage>
            </S.UserInputLabel>
            <S.UserInput
              name="email"
              value={userForm.email}
              onChange={handleUserFormChange}
              autoComplete="off"
              ref={emailInputRef}
            />
            <S.UserInputLabel>
              <span>비밀번호*</span>
              <S.ErrorMessage className={validErrors.password ? 'visible' : ''}>
                {validErrors.password}
              </S.ErrorMessage>
            </S.UserInputLabel>
            <S.UserInput
              name="password"
              type="password"
              value={userForm.password}
              onChange={handleUserFormChange}
              autoComplete="off"
            />

            <S.UserInputLabel>
              <span>비밀번호 재확인*</span>
              <S.ErrorMessage
                className={validErrors.passwordConfirm ? 'visible' : ''}
              >
                {validErrors.passwordConfirm}
              </S.ErrorMessage>
            </S.UserInputLabel>
            <S.UserInput
              name="passwordConfirm"
              type="password"
              value={userForm.passwordConfirm}
              onChange={handleUserFormChange}
              autoComplete="off"
            />
            <S.UserInputLabel>
              <span>이름*</span>
              <S.ErrorMessage className={validErrors.name ? 'visible' : ''}>
                {validErrors.name}
              </S.ErrorMessage>
            </S.UserInputLabel>
            <S.UserInput
              name="name"
              value={userForm.name}
              onChange={handleUserFormChange}
            />
            <S.UserInputLabel>
              <span>휴대전화*</span>
              <S.ErrorMessage className={validErrors.phone ? 'visible' : ''}>
                {validErrors.phone}
              </S.ErrorMessage>
            </S.UserInputLabel>
            <S.UserInput
              name="phone"
              value={userForm.phone}
              onChange={handleUserFormChange}
            />
          </S.UserInputBox>
          {submitError && (
            <S.SubmitErrorMessage className={submitError ? 'visible' : ''}>
              모든 정보를 올바르게 입력한 후 다시 시도해 주세요.
            </S.SubmitErrorMessage>
          )}
          {responseError && (
            <S.ResponseErrorMessage className={responseError ? 'visible' : ''}>
              {responseError}
            </S.ResponseErrorMessage>
          )}
          <S.ButtonBox>
            <S.SubmitButton>가입하기</S.SubmitButton>
            <S.ResetButton onClick={handleResetForm}>초기화</S.ResetButton>
          </S.ButtonBox>
          <S.LoginPrompt>
            <S.LoginPromptMessage>이미 계정이 있으신가요?</S.LoginPromptMessage>
            <S.LoginPromptLink to={ROUTE_LINK.LOGIN.link}>
              로그인
            </S.LoginPromptLink>
          </S.LoginPrompt>
        </S.SignUpForm>
      </S.BoxOverlay>
    </S.SignUpBox>
  );
};

export default SignUp;
