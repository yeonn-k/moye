import ROUTE_LINK from '../routes/RouterLink';
const URL = process.env.REACT_APP_API_URL;
const PORT = process.env.REACT_APP_API_PORT;
export const BASE_URL = `${URL}:${PORT}`;

export const APIS = {
  login: `${BASE_URL}${ROUTE_LINK.LOGIN.link}`,
  signup: `${BASE_URL}${ROUTE_LINK.SIGNUP.link}`,
  today: `${BASE_URL}${ROUTE_LINK.TODAY.link}`,
  month: `${BASE_URL}${ROUTE_LINK.MONTH.link}`,
  owner: `${BASE_URL}${ROUTE_LINK.OWNER.link}`,
  store: `${BASE_URL}${ROUTE_LINK.STORE.link}`,
  storeEdit: `${BASE_URL}${ROUTE_LINK.STOREEDIT.link}`,
  storeRegister: `${BASE_URL}${ROUTE_LINK.STOREREGISTER.link}`,
  storePictureUpload: `${BASE_URL}/uploads`,
};
