const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // Path you want to proxy
    
    createProxyMiddleware({
      target: 'https://api.printful.com', // Target server to proxy the requests to
      changeOrigin: true,
    })
  );
};