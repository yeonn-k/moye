import { ChangeEvent, FormEvent, useState } from 'react';
import { S } from './SignUp';

const SignUp = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });

  const handleUserFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userForm);
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
