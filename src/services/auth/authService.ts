import api from '../api';

interface SignupRequest {
  email: string;
  name: string;
  phone: string;
  password: string;
}

interface SignupResponse {
  status: number;
  data: {
    body: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  data: {
    body: {
      access: string;
      refresh: string;
    };
  };
}

export const signUpService = async ({
  email,
  name,
  phone,
  password,
}: SignupRequest) => {
  try {
    const response: SignupResponse = await api.post('/users', {
      email,
      name,
      phone,
      password,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error('회원가입 에러: ', e);
  }
};

export const loginService = async ({ email, password }: LoginRequest) => {
  try {
    const response: LoginResponse = await api.post('/login', {
      email,
      password,
    });
    if (response.status === 200) {
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.error('로그인 에러: ', e);
  }
};

export const logout = async () => {
  await api.post('/logout');
};
