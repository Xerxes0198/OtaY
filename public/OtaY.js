//Client side JS
var socket, canvasContext, canvas;

//Touch  Handler
var touchHandler;

window.onload = function()
{
  socket = io();
  canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');

  socket.on('touch', function(location)
  {
    drawCirlce(location.locX, location.locY);
  });


  //Setup touch Handler
  //touchHandler = new TouchHandler();
}

drawCirlce = function(locX, locY)
{
  radius = 10;
  context.beginPath();
  context.arc(locX - radius, locY - radius, radius, 0, 2 * Math.PI, false);
  context.fillStyle = '#66ff33';
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#000000';
  context.stroke();
}



canvas.addEventListener('click', function(event)
{
  socket.emit('canvasTouch', event.clientX, event.clientY);
  var t = new touch(event.clientX, event.clientY);
});
