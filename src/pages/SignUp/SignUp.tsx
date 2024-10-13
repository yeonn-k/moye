import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './SignUp';
import { signUpService } from '../../services/auth/authService';

const SignUp = () => {
  // TODO: 이메일 등록 여부 중복 체크 로직, 버튼 추가

  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });
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
    const { email, password, name, phone } = userForm;
    const signUpForm = { email, password, name, phone };
    if (!email || !password || !name || !phone) {
      return;
    }
    try {
      const response = await signUpService(signUpForm);
      if (response) {
        // TODO: 회원가입 완료 안내 표시는 어떻게 할 지 고민해보기
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
            <S.UserInput
              name="email"
              type="email"
              value={userForm.email}
              onChange={handleUserFormChange}
            />
          </S.UserInputLabel>
          <S.UserInputLabel>
            <span>비밀번호*</span>
            <S.UserInput
              name="password"
              type="password"
              value={userForm.password}
              onChange={handleUserFormChange}
            />
          </S.UserInputLabel>
          <S.UserInputLabel>
            <span>비밀번호 재확인*</span>
            <S.UserInput
              name="passwordConfirm"
              type="password"
              value={userForm.passwordConfirm}
              onChange={handleUserFormChange}
            />
          </S.UserInputLabel>
          <S.UserInputLabel>
            <span>이름*</span>
            <S.UserInput
              name="name"
              value={userForm.name}
              onChange={handleUserFormChange}
            />
          </S.UserInputLabel>
          <S.UserInputLabel>
            <span>휴대전화</span>
            <S.UserInput
              type="number"
              name="phone"
              value={userForm.phone}
              onChange={handleUserFormChange}
            />
          </S.UserInputLabel>
        </S.UserInputBox>
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
