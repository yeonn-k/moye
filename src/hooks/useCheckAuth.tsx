const useCheckAuth = () => {
  let auth = null;
  const authCheck = localStorage.getItem('auth');

  if (authCheck !== null) {
    auth = JSON.parse(authCheck);
  }

  return { auth };
};

export default useCheckAuth;
