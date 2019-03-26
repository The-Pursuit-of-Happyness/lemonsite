var express = require("express")
var app = express();
const proxyMiddleware = require('http-proxy-middleware')
var router = express.Router();

app.get('/', function(req, res) {
  res.send('hello world');
});

app.use('/api/user', require('./login'));

app.listen(3001, (err) => {
  if (err) {
    throw err;
  }
  console.log('>Ready on http://localhost:3001');
});