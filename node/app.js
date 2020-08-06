const Koa = require('koa')
const Router = require('@koa/router');
const serve = require('koa-static');
const path = require('path')

const { render } = require('../pkg/ssvm_nodejs_starter_lib.js');

const app = new Koa()
const router = new Router();

router.get('/:encodedMD', (ctx) => {
  ctx.response.status = 200
  ctx.response.body = render(Buffer.from(ctx.params.encodedMD, 'base64').toString())
})

app.use(serve(path.join(__dirname, './public')))

app
  .use(router.routes())
  .use(router.allowedMethods());

const hostname = '0.0.0.0'
const port = 3000

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
