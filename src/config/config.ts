export const URL = process.env.REACT_APP_API_URL;
export const PORT = process.env.REACT_APP_API_PORT;

export const APIS = {
  login: `${URL}:${PORT}/login`,
  signup: `${URL}:${PORT}/signup`,
  today: `${URL}:${PORT}/today`,
  month: `${URL}:${PORT}/month`,
  owner: `${URL}:${PORT}/owner`,
  store: `${URL}:${PORT}/store`,
  storeEdit: `${URL}:${PORT}/store/edit`,
};
