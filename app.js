//The very first comment in OtaY

//It all starts here...

//First require express
var express = require('express');
var $ = require('stringformat');
//Create an app instance of express
var app     = express();

var http    = require('http').Server(app);
var io      = require('socket.io')(http);
var logger  = require('./logger.js');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket)
{

  console.log("Derp connected");

  //Create a touch for this connection
  var currentTouchX, currentTouchY;

  //And an array of updatable locations
  var currentTouchPointsX = [];
  var currentTouchPointsY = [];

  socket.on('radioCheck', function()
  {
    console.log("Radio Check Called");
  });

  socket.on('canvasTouch', function(inX, inY)
  {
    console.log("Touched at X: " + inX + ", Y: " + inY);

    io.sockets.emit('touch', {"locX" : inX, "locY" : inY});

  });

  socket.on('touchStart', function(inX, inY, inUser)
  {
    currentTouchPointsX = [];
    currentTouchPointsY = [];
    currentTouchX = inX;
    currentTouchY = inY;
    console.log("Touch started at: " + inX + ", " + inY);
    logger.logSingleTouch(inX,inY, inUser, 123);

  });

  socket.on('touchUpdate', function(inX, inY)
  {
    currentTouchPointsX.push(inX);
    currentTouchPointsY.push(inY);
    io.sockets.emit('touchUpdate', inX, inY);

  });

  socket.on('touchEnd', function(intX, intY)
  {
    console.log("Touching ended: " + currentTouchPointsX.length);

    //Log current touch to SQL Logger
    //Consider less than 5 touches to be a single point touch
    if(currentTouchPointsX.length > 5)
    {
      logger.logMovingTouch(currentTouchPointsX, currentTouchPointsY);
    }
    else {
      console.log("Single touch, not logging multi.");
    }
    //clear current touch
    currentTouchPointsX = [];
    currentTouchPointsY = [];
  });

  socket.on("log", function(message)
  {
    console.log(message);
    //console.log("Me called");

  });

  socket.on('disconnect', function()
  {
    //User disconnect
    console.log("User disconnected");

  });

});

//Set the HTTP Server to list
http.listen(3876, function()
{
  console.log("It's still a secret...");
  console.log(__dirname + "/public");
});
