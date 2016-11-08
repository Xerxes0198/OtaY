//Client side JS
var socket, canvas, ctx;

window.onload = function()
{
  socket = io();
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext('2d');

  socket.on('touch', function(location)
  {
    drawCirlce(location.locX, location.locY);
  });

  canvas.addEventListener('touchmove', function(Event)
  {
    event.preventDefault();
    console.log('TOUCH DOWN!!')
    socket.emit("radioCheck");

  }, false);

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
