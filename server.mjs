import http from 'node:http';
import {readFile} from 'node:fs/promises';

const port = Number(process.env.PORT || 3000);
const page = new URL('./public/index.html', import.meta.url);

http.createServer(async (req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  if (pathname === '/health') {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    return res.end('ok');
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, {'Content-Type': 'text/plain; charset=utf-8'});
    return res.end('Method not allowed');
  }
  try {
    const html = await readFile(page);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache'});
    res.end(req.method === 'HEAD' ? undefined : html);
  } catch (err) {
    console.error('Failed to serve app:', err);
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Application temporarily unavailable');
  }
}).listen(port, '0.0.0.0', () => console.log('InterviewReady listening on ' + port));
