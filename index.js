const http = require('node:http');
// console.log('What is http?', http)
let goatCount = 0;
// Create a local server to receive data from
const handleIncomingRequest = (req, res) => {
    goatCount += 1;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: `${goatCount} goats have visited this page!`,
    }));
}
const server = http.createServer(handleIncomingRequest);

server.listen(8000);