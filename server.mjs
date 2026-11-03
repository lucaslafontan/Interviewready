import http from 'node:http';
import {readFile} from 'node:fs/promises';
const port=Number(process.env.PORT||3000);
http.createServer(async(req,res)=>{
  const headers={'Content-Type':'text/html; charset=utf-8','X-Content-Type-Options':'nosniff'};
  if(req.method==='GET'&&(req.url==='/'||req.url==='/index.html')){
    try {res.writeHead(200,headers);res.end(await readFile(new URL('./public/index.html',import.meta.url),'utf8'));}
    catch {res.writeHead(500);res.end('Unable to load app');}
  } else {res.writeHead(404);res.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log('InterviewReady listening on '+port));