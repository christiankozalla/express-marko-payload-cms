const express = require('express');
const compressionMiddleware = require('compression');
const markoMiddleware = require('@marko/express').default;
const payload = require('payload');
require('dotenv').config();
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

(async () => {
  const app = express()
    .use(compressionMiddleware()) // Enable gzip compression for all HTTP responses.
    .use(markoMiddleware());

  payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    }
  });

  if (isProd) {
    app
      .use('/assets', express.static('dist/assets')) // Serve assets generated from vite.
      .use(require('./dist').default); // Use the default export from `./dist/index.js`
  } else {
    const devServer = await require('vite').createServer({
      server: { middlewareMode: true }
    });
    app.use(devServer.middlewares);
    app.use(async (req, res, next) =>
      (await devServer.ssrLoadModule('./src/index')).default(
        req,
        res,
        (err) => {
          if (err) {
            devServer.ssrFixStacktrace(err);
            next(err);
          } else {
            next();
          }
        }
      )
    );
  }

  app.listen(port, (err) => {
    if (err) {
      throw err;
    }

    console.log(`Listening on port ${port}`);
  });
})();
