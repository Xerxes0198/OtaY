//Client side JS
var socket, canvas, ctx;

window.onload = function()
{
  socket = io();
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');

  socket.on('touchUpdate', function(location)
  {
    //drawCirlce(location.locX, location.locY);
    navigator.vibrate(1);
  });

  setupEventHandlers(canvas, socket);


  //Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clearCanvas();
}

drawCirlce = function(locX, locY)
{
  radius = 10;
  ctx.beginPath();
  ctx.arc(locX - radius, locY - radius, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#66ff33';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
}

clearCanvas = function()
{
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0, canvas.width, canvas.height);
}
