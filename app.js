//The very first comment in OtaY

//It all starts here...

//First require express
var express = require('express');

//Create an app instance of express
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(3000, function()
{
  console.log("It's still a secret...");
  console.log(__dirname + "/public");

});
