const { render } = require('../pkg/ssvm_nodejs_starter_lib.js');

const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  const base64Regex = /\/((?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?)\/?/
  const m = req.url.match(base64Regex)
  if (!!m) {
    res.end(render(Buffer.from(m[1], 'base64').toString()))
  } else {
    res.writeHead(404, 'Not Found')
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
