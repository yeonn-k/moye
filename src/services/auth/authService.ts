import { Store } from '../../store/slices/auth/authSlice';
import axios from 'axios';
import { APIS } from '../../config/config';

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
    body: string;
  };
}

interface GetUserRequest {
  email: string;
}

interface GetUserResponse {
  status: number;
  data: {
    body: {
      id: string;
      name: string;
      phone: string;
    };
  };
}

interface GetStoresRequest {
  userId: string;
}

interface GetStoresResponse {
  status: number;
  data: {
    body: {
      stores: Store[];
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
    const response: SignupResponse = await axios.post(APIS.users, {
      email,
      name,
      phone,
      password,
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw new Error(e.response.data.message);
    } else {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
};

export const loginService = async ({ email, password }: LoginRequest) => {
  try {
    const response: LoginResponse = await axios.post(APIS.login, {
      email,
      password,
    });
    if (response.status === 200) {
      return response;
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      throw new Error(e.response.data.message);
    } else {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
};

export const getUserByEmailService = async ({ email }: GetUserRequest) => {
  try {
    const response: GetUserResponse = await axios.get(
      `${APIS.users}?email=${email}`,
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(e.message);
    }
  }
};

export const getStoresByIdService = async ({ userId }: GetStoresRequest) => {
  try {
    const response: GetStoresResponse = await axios.get(
      `${APIS.users}/${userId}`,
    );
    if (response.status === 200) {
      return response.data.body.stores;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(e.message);
    }
  }
};
