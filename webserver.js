const http = require('node:http');
const fs = require('fs').promises;

const hostname = '127.0.0.1';
const port = 3000;
const htmlfile = 'demo.html'; 

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      fs.readFile(__dirname + "/" + htmlfile)
        .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        })        
        .catch(err => {
          console.log(`Error render html file.`);
          res.writeHead(500);
          res.end(err);
          return;
        });
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});