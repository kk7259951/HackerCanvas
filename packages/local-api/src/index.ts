import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number, 
  filename: string, 
  dir: string, 
  useProxy: boolean
) => {
  const app = express();

  if (useProxy) {
    // wire up the proxy with configuration object
    app.use(createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true, // enable websocket support
      logLevel: 'silent' // prevents createProxyMiddleware from logging everything from a request
    }));
  } else {
    const packagePath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(packagePath)));
  }

  app.use(createCellsRouter(filename, dir));

  app.listen(port, () => {
    console.log('listening on port', port);
  });
};