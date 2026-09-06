'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname);
const port = Number(process.argv[2] || 8080);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400);
    response.end('Bad request');
    return;
  }

  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = path.resolve(root, `.${requested}`);
  if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  fs.stat(file, (statError, stats) => {
    if (statError || !stats.isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }
    response.writeHead(200, {
      'Cache-Control': 'no-cache',
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream'
    });
    fs.createReadStream(file).pipe(response);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`MuMu Prompts: http://localhost:${port}`);
});
