//Handle events and touches for given canvas

var socket;
var touching = false;

var currentTouch, lastTouchX, lastTouchY;

setupEventHandlers = function(inCanvas, inSocket)
{
  socket = inSocket;



  //Start of touches
  inCanvas.addEventListener('touchstart', function(event)
  {
    event.preventDefault();
    processTouchStart(event.targetTouches[0].pageX, event.targetTouches[0].pageY);

  }, false);

  inCanvas.addEventListener('touchmove', function(event)
  {
    if(touching = true)
    {
      processTouchUpdate(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
    }

  }, false);

  inCanvas.addEventListener('touchend', function(event)
  {
    event.preventDefault();
    processTouchEnd(lastTouchX, lastTouchY);

  }, false);

  inCanvas.addEventListener('mousedown', function(event)
  {
    processTouchStart(event.clientX, event.clientY);

  });

  //TODO: Greg - I was here, please re-write this function
  inCanvas.addEventListener('mousemove', function(event)
  {
    if(touching == true)
    {
      processTouchUpdate(event.clientX, event.clientY);
    }
  });

  inCanvas.addEventListener('mouseup', function(event)
  {
    processTouchEnd(event.clientX, event.clientY);

  });
}

//For either click or touch
processTouchStart = function(inX, inY)
{
  socket.emit("touchStart", inX,inY);

  touching = true;

}

processTouchUpdate = function(inX, inY)
{
  lastTouchX = inX;
  lastTouchY = inY;

  socket.emit("touchUpdate", inX, inY);
}

processTouchEnd = function(inX, inY)
{
  socket.emit("touchEnd", inX, inY);
  touching = false;
}
