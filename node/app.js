const { render } = require('../pkg/ssvm_nodejs_starter_lib.js');

const http = require('http');
const url = require('url');
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url)
  const queryObject = url.parse(req.url,true).query;
  console.log(queryObject)
  if (!queryObject['md']) {
    res.end(`Please use command curl http://${hostname}:${port}/?md=#Hello%20World \n`);
  } else {
    res.end(render(queryObject['md']) + '\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
