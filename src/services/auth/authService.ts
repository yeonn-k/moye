import api from '../api';

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('로그인 실패');
    }
  } catch (e) {
    console.error('로그인 에러: ', e);
  }
};

export const logout = async () => {
  await api.post('/logout');
};
