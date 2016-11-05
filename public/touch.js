class touch
{
  //var startX, startY, endX, endY, startTime, endTime;

  constructor(inX, inY)
  {
    this.startX = inX;
    this.statyY = inY;
    this.startTime = Date.now();

    console.log("Touch recorded");
  }

}
