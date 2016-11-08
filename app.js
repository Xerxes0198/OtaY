//The very first comment in OtaY

//It all starts here...

//First require express
var express = require('express');

//Create an app instance of express
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket)
{

  console.log("Derp connected");


  socket.on('radioCheck', function()
  {
    console.log("Radio Check Called");
  });

  socket.on('canvasTouch', function(inX, inY)
  {
    console.log("Touched at X: " + inX + ", Y: " + inY);

    io.sockets.emit('touch', {"locX" : inX, "locY" : inY});

  });

  socket.on('disconnect', function()
  {
    //User disconnect
    console.log("User disconnected");

  });

});


//Set the HTTP Server to list
http.listen(3000, function()
{
  console.log("It's still a secret...");
  console.log(__dirname + "/public");

});
