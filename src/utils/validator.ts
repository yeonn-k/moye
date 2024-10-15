export const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value && !emailRegex.test(value)
    ? '유효한 이메일 주소를 입력해주세요.'
    : '';
};

export const validateForm = (name: string, value: string, userForm: any) => {
  let error = '';

  if (name === 'email') {
    error = validateEmail(value);
  }

  if (name === 'password') {
    const passwordRegex = /^[A-Za-z\d!@#$%^&*]{12,}$/;
    if (value && !passwordRegex.test(value)) {
      error = '비밀번호는 12자 이상, 알파벳, 숫자 및 특수문자(!@#$%^&*)가 포함';
    }
  }

  if (name === 'passwordConfirm') {
    if (value && value !== userForm.password) {
      error = '입력한 비밀번호가 서로 다릅니다. 다시 입력해주세요.';
    }
  }

  if (name === 'name') {
    if (value && value.length < 2) {
      error = '이름은 최소 2자 이상 입력해주세요.';
    }
  }

  if (name === 'phone') {
    const phoneRegex = /^\d{11}$/;
    if (value && !phoneRegex.test(value)) {
      error = '전화번호는 11자리 숫자로만 입력해주세요.';
    }
  }

  return error;
};
