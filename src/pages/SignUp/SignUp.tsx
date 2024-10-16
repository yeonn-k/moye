import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './SignUp.style';
import { signUpService } from '../../services/auth/authService';
import { validateForm } from '../../utils/validator';

const SignUp = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });

  const [submitError, setSubmitError] = useState(false);

  const navigate = useNavigate();

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmitError(false);
    const { name, value } = e.target;
    const error = validateForm(name, value, userForm);

    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmitButtonClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, phone } = userForm;
    const signUpForm = { email, password, name, phone };
    const hasErrors = Object.values(errors).some((error) => error !== '');

    if (!email || !password || !name || !phone || hasErrors) {
      setSubmitError(true);
      return;
    }

    try {
      const response = await signUpService(signUpForm);
      if (response) {
        navigate('/login');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <S.SignUpBox>
      <S.PageTitle>Project Title</S.PageTitle>
      <S.SignUpForm onSubmit={handleSubmitButtonClick}>
        <S.FormTitle>회원 가입</S.FormTitle>
        <S.UserInputBox>
          <S.UserInputLabel>
            <span>이메일*</span>
            <S.ErrorMessage className={errors.email ? 'visible' : ''}>
              {errors.email}
            </S.ErrorMessage>
          </S.UserInputLabel>
          <S.UserInput
            name="email"
            value={userForm.email}
            onChange={handleUserFormChange}
            autoComplete="off"
          />
          <S.UserInputLabel>
            <span>비밀번호*</span>
            <S.ErrorMessage className={errors.password ? 'visible' : ''}>
              {errors.password}
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
            <S.ErrorMessage className={errors.passwordConfirm ? 'visible' : ''}>
              {errors.passwordConfirm}
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
            <S.ErrorMessage className={errors.name ? 'visible' : ''}>
              {errors.name}
            </S.ErrorMessage>
          </S.UserInputLabel>
          <S.UserInput
            name="name"
            value={userForm.name}
            onChange={handleUserFormChange}
          />
          <S.UserInputLabel>
            <span>휴대전화*</span>
            <S.ErrorMessage className={errors.phone ? 'visible' : ''}>
              {errors.phone}
            </S.ErrorMessage>
          </S.UserInputLabel>
          <S.UserInput
            name="phone"
            value={userForm.phone}
            onChange={handleUserFormChange}
          />
        </S.UserInputBox>

        <S.SubmitErrorMessage className={submitError ? 'visible' : ''}>
          모든 정보를 올바르게 입력한 후 다시 시도해 주세요.
        </S.SubmitErrorMessage>

        <S.SubmitButton>가입하기</S.SubmitButton>
        <S.LoginPrompt>
          <S.LoginPromptMessage>이미 계정이 있으신가요?</S.LoginPromptMessage>
          <S.LoginPromptLink to="/login">로그인</S.LoginPromptLink>
        </S.LoginPrompt>
      </S.SignUpForm>
    </S.SignUpBox>
  );
};

export default SignUp;
