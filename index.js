const http = require("node:http");
let hitCount = 0; //let is a way to make a mutable variable. basically saying i'm letting this be thing 'a' until i want it to change to thing 'b'.
let errorCount = 0;
//define respondWithHomepage Function
function respondWithHomepage(response) {
  hitCount++;
  response.writeHead(200, {
    "Content-Type": "text/html",
    "racoon-invasion-status": "the racoons have not yet invaded. we're safe.... for now."
  });
  response.end(`
  <!doctype html />
  <html>
    <head>
      <title> welcome to api</title>
    </head>
    <body>
      <h1> holy tamales Batman!! </h1>
      <p> there are tamales everywhere.</p>
      <p> ${hitCount} tamales have been made here...</p>
    </body>
  </html>
  `);
  console.log("what is hit count?", hitCount);
}
//define respondWithFrogs Function
function respondWithFrogs(response) {
  hitCount++;
  response.writeHead(418, {
    "Content-Type": "application/json",
    "racoon-invasion-status": "the frogs came over for tea."
  });
  response.end(
    JSON.stringify({
      data: hitCount + " goats have hopped around this pond!",
    })
  );
  console.log("what is ribbit count?", hitCount);
}
//define respondWithError Function
function respondWithError(response) {
  errorCount++;
  response.writeHead(404, {
    "Content-Type": "text/html",
    "racoon-invasion-status": "THE RACOONS ARE INVADING!! WE'RE ALL DOOOOMED!!"
  });
  response.end(`
  <!doctype html />
  <html>
    <head>
      <title> welcome to api </title>
    </head>
    <body>
      <h1> Sorry batman (wah wah wahhhh) </h1>
      <p> only robin is here, and he ate all the tamales.</p>
      <p> ${errorCount} tamales have been made here...</p>
    </body>
  </html>
  `);
}

const handleIncomingRequest = (request, response) => {
  console.log("what is request.url?", request.url);
  if (request.url === "/") {
    respondWithHomepage(response);
  } else if(request.url === "/frogs"){
    respondWithFrogs(response);
  } else {
    respondWithError(response);
  }
};
// Create a local server to receive data from
const server = http.createServer(handleIncomingRequest);
// tell the server to listen for incoming requests on port 1400
server.listen(1400);



