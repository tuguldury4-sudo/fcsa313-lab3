const http = require('node:http');

http.createServer((req, res) => {
  const send = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  switch (req.method + ' ' + req.url) {
    case 'POST /cart/add':
      return send(200, { ok: true, items: 1 });
    case 'GET /report':
      return setTimeout(() => send(200, { rows: 20000 }), 200 + Math.random() * 200);
    case 'POST /pay':
      return Math.random() < 0.05
        ? send(500, { error: 'gateway timeout' })
        : send(200, { paid: true });
    default:
      return send(404, { error: 'not found' });
  }
}).listen(3003, '127.0.0.1');
