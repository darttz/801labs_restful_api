const http = require("node:http");
let hitCount = 0; //let is a way to make a mutable variable. basically saying i'm letting this be thing 'a' until i want it to change to thing 'b'.
let errorCount = 0;
//action is where we are subitting the form to
const petForm = /*html*/`
  <form action="/submitPets" method="GET">
    <p><label><span>Pet's Name: </span><input type="text" name="name" /></label></p>
    <p><label><span>Pet's Power Level: </span><input type="number" name="powerLevel" /></label></p>
    
    <p><label><span>Is this goat Grumpy?</span><input type="checkbox" value="true" name="isGrumpy" /></label></p>
    <h3>Fruit selection:</h3>
    <p><label><span>Oranges</span><input type="checkbox" value="oranges" name="fruits" /></label></p>
    <p><label><span>Pineapples</span><input type="checkbox" value="pineapples" name="fruits" /></label></p>
    <p><label><span>Kiwis</span><input type="checkbox" value="kiwis" name="fruits" /></label></p>
    <p><label><span>Bananas</span><input type="checkbox" value="bananas" name="fruits" /></label></p>

    <p><input type="submit" value="Submit Pet" /></p>
  </form>
`
const css = /* html */ `
<style type="text/css">
body {
  background-color:#000; 
  color: #fff; 
  font-family:Arial, Helvetica, sans-serif;
}
.container {
  width:600px; 
  height:600px; 
  background-color:#262626; 
  border:1px solid #fff; 
  padding:0 20px;
}
h1 {
  color:#cef; 
  border:1px dashed #ccc; 
  text-align:center; 
  padding:12px 0;
}
</style>
`

//define respondWithHomepage Function
function respondWithHomepage(response) {
  hitCount++;
  response.writeHead(200, {
    "Content-Type": "text/html",
    "racoon-invasion-status": "the racoons have not yet invaded. we're safe.... for now."
  });
  response.end(/*html*/`
  <!doctype html>
  <html>
    <head>
      <title>Welcome to the new api sucka!</title>
      ${css}
    </head>
    <body>
      <div class="container">
        <h1> holy tamales Batman!! </h1>
        <p> there are tamales everywhere.</p>
        <p> ${hitCount} tamales have been made here...</p>
        ${petForm}
      </div>
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
      ${css}
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
  //TODO: ask about closures & scopes

  // parsing the queryString
  const queryString = request.url.split('?').pop()
  const queryStringParameters = queryString.split('&')
  console.log('what is queryString?',queryString)
  console.log('what is queryStringParameters?',queryStringParameters)
  response.writeHead(200, {
    "Content-Type": "text/html",
    "racoon-invasion-status": "the racoons have not yet invaded. we're safe.... for now."
  });
  response.end(/*html*/`
  <!doctype html />
  <html>
    <head>
      <title>Welcome to api of the new</title>
      ${css}
    </head>
    <body>
      <h1>Did we submit?</h1>
      <p> Looks like submit!</p>
    </body>
  </html>
  `);

}

const honk = function() {
  console.log('honk');
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
  honk();
};
// Create a local server to receive data from
const server = http.createServer(handleIncomingRequest);
// tell the server to listen for incoming requests on port 1400
server.listen(1400);



