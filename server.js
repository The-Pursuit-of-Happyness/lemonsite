const express = require('express');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get('/weizhuang', (req, res) => {
    console.log('req:', req.params);
    const actualPage = '/item';
    const queryParams = {
      title: req.params.id,
    };
    app.render(req, res, actualPage, queryParams);
  });

  const proxyTable = {
    '/api': {
      target: 'http://localhost:3001/',
      // secure: true,
      // pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  }

  // proxy api requests
  Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    server.use(proxyMiddleware(context, options))
  })
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('>Ready on http://localhost:3000');
  });
}).catch((ex) => {
  console.log('ex:', ex);
  process.exit(1);
});