const http = require("node:http");
let hitCount = 0; //let is a way to make a mutable variable. basically saying i'm letting this be thing 'a' until i want it to change to thing 'b'.
let errorCount = 0;
//action is where we are subitting the form to
const petForm = /*html*/`
  <form action="/submitPets" method="GET">
    <p><input type="text" name="name" placeholder="what's your pet's name?" /></p>
    <p><input type="submit" value="Submit Pet" /></p>
  </form>
`

//define respondWithHomepage Function
function respondWithHomepage(response) {
  hitCount++;
  response.writeHead(200, {
    "Content-Type": "text/html",
    "racoon-invasion-status": "the racoons have not yet invaded. we're safe.... for now."
  });
  response.end(/*html*/`
  <!doctype html />
  <html>
    <head>
      <title>Welcome to the new api sucka!</title>
    </head>
    <body>
      <h1> holy tamales Batman!! </h1>
      <p> there are tamales everywhere.</p>
      <p> ${hitCount} tamales have been made here...</p>
      ${petForm}
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
  response.end(/*html*/`
  <!doctype html />
  <html>
    <head>
      <title> welcome to api punk project manager!</title>
    </head>
    <body>
      <h1> Sorry batman (wah wah wahhhh) </h1>
      <p> only robin is here, and he ate all the tamales.</p>
      <p> ${errorCount} tamales have been made here...</p>
    </body>
  </html>
  `);
}

function respondWithSubmitPets(request, response) {
  //TODO: parse the URL query string
  //TODO: practice an xss injection attack
  //TODO: sanitize the URL parameters
  //TODO: start capturing our sanitized pet data
  response.writeHead(200, {
    "Content-Type": "text/html",
    "racoon-invasion-status": "the racoons have not yet invaded. we're safe.... for now."
  });
  response.end(/*html*/`
  <!doctype html />
  <html>
    <head>
      <title>Welcome to api of the new</title>
    </head>
    <body>
      <h1>Did we submit?</h1>
      <p> Looks like submit!</p>
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
  } else if(request.url.startsWith("/submitPets")){
    respondWithSubmitPets(request, response);
  } else {
    respondWithError(response);
  }
};
// Create a local server to receive data from
const server = http.createServer(handleIncomingRequest);
// tell the server to listen for incoming requests on port 1400
server.listen(1400);



