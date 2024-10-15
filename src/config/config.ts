const URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;
export const BASE_URL = `${URL}:${PORT}`;

export const APIS = {
  login: `${BASE_URL}/login`,
  signup: `${BASE_URL}/signup`,
  today: `${BASE_URL}/today`,
  month: `${BASE_URL}/month`,
  owner: `${BASE_URL}/owner`,
  store: `${BASE_URL}/store`,
  storeEdit: `${BASE_URL}/store/edit`,
};
