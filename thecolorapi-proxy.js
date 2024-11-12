import http from 'http';
import https from 'https';

const server = http.createServer((req, res) => {
  https.get(`https://www.thecolorapi.com/id?hex=${req.url.slice(1)}`, (response) => {
    let json = '';
    response.on('data', (data) => {
      json += data
    })
    response.on('end', () => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.end(json);
    });
  })
})

server.listen(3001);
