const ROUTE_LINK = {
  ENTRYPOINT: { path: '/', link: '/' },
  LOGIN: { path: '/login', link: '/login' },
  SIGNUP: { path: '/signup', link: '/signup' },
  OWNER: { path: 'owner', link: '/owner' },
  TODAY: { path: 'today/:storeId', link: '/today' },
  MONTH: { path: 'month/:storeId', link: '/month' },
  STORE: { path: 'stores/:storeId', link: '/stores' },
  STOREEDIT: { path: 'stores/:storeId/edit', link: '/stores/edit' },
  STOREREGISTER: { path: 'stores/register', link: '/stores/register' },
};

export default ROUTE_LINK;
