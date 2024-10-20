import ROUTE_LINK from '../routes/RouterLink';
export const BASE_URL = `http://localhost:3000/api`;

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
  getImageBase: `${BASE_URL}/`,
  users: `${BASE_URL}/users`,
};
