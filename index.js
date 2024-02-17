const http = require('node:http');
// console.log('What is http?', http)
let goatCount = 0;
let errorCount = 0;
// Create a local server to receive data from
const handleIncomingRequest = (request, response) => {
  console.log('What is Request URL?', request.url)
  if (request.url === "/") {
    goatCount += 1;
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'goat-integrity': 'Yes, these goats are trustworthy.',
      'all-the-things': 'These are the things'
    });
    response.end(JSON.stringify({
      data: `${goatCount} goats have visited this page!`,
    }));
  } else {
    errorCount += 1;
    response.writeHead(404, {
      'Content-Type': 'application/json',
      'goat-integrity': 'No, these goats are NOT trustworthy.',
      'all-the-things': 'These are NOT the things'
    });
    response.end(JSON.stringify({
      data: `${errorCount} goats are invalid!`,
    }));
  }
}
const server = http.createServer(handleIncomingRequest);

server.listen(8000);