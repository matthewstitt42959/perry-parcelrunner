const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const https = require('https');
const fs = require('fs');
const { default: e } = require('cors');

process.env.NODE_EXTRA_CA_CERTS = 'C:/Users/266833/Documents/Workplace/certificate/cacert.pem';

module.exports = function(app) {
  app.use(
    '/api',  // Path you want to proxy
    
    createProxyMiddleware({
      target: 'https://api.printful.com', // Target server to proxy the requests to
      changeOrigin: true,
      OnError: (err, req, res) => {
        console.log('Error:', err);
        res.status(500).send('Something went wrong.');
      },
    })
  );
};