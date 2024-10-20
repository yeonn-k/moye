const { createProxyMiddleware } = require('http-proxy-middleware');
const URL = process.env.REACT_APP_API_URL;

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${URL}`,
      changeOrigin: true,
    }),
  );
};
