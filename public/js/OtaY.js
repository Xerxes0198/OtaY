//Client side JS
var socket, canvas, ctx;

var circles = [];

window.onload = function()
{
  socket = io();
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');

  socket.on('touchUpdate', function(inX, inY)
  {
    //drawCirlce(location.locX, location.locY);
    navigator.vibrate(1);
    drawCirlce(inX, inY);
  });

  setupEventHandlers(canvas, socket);

  //Set canvas size
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  clearCanvas();
}

drawCirlce = function(inX, inY)
{
  /*
  radius = 10;
  ctx.beginPath();
  ctx.arc(locX - radius, locY - radius, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#66ff33';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  */
  circles.push(new Circle(inX, inY))

  console.log(inX, inY);
}

clearCanvas = function()
{
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0, canvas.width, canvas.height);
}
