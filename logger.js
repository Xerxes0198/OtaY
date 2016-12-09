//Setup connection to the SQL Server
var connected = false, sqlConnection;
var mysql = require('mysql');
var $ = require('util');
var moment = require('moment');
var touchId;

module.exports = {
  //Create some functions for this class
  logSingleTouch: function(inX, inY, inUserName, inRoomId)
  {
    var now = moment(new Date());

    //var sql = $.format("INSERT INTO touches(touchTime, touchX, touchY, userName) VALUES('{0}','{1},'{2},'{3}');", "2016-05-05", "5", "12", "Greg");
    var sql = $.format("INSERT INTO touches(touchTime, touchX, touchY, userName, roomId) VALUES('%s', '%s', '%s', '%s', %d);", now.format("YYYY-MM-DD HH:mm:ss"), inX, inY, inUserName, inRoomId);
    sqlConnection.query(sql, function(err, results)
    {
      //Get the Ident value for multitouch INSERT
      touchId = results.insertId;
    });
  },

  logMovingTouch: function(inTouchesX, inTouchesY)
  {
    if(touchId > 0)
    {
      for(i = 0; i < inTouchesX.length; i++)
      {
        //Log it
        //console.log($.format("Logging: %s and %s", inTouchesX[i], inTouchesY[i]));

        sqlConnection.query($.format("INSERT INTO MultiTouches(TouchId, TouchX, TouchY) VALUES('%s','%s','%s');", touchId, inTouchesX[i], inTouchesY[i]));
      }
      console.log("Touch id: " + touchId);
    }
    //At the point we don't need an id
    touchId = 0;
    //But who cares :)
    //Consider if it is 0 maybe log a single touch
  }
};


attemptConnect = function()
{
  sqlConnection = mysql.createConnection(
  {
    host      : '192.168.178.47',
    user      : 'OtaY',
    password  : 'Lemmings42',
    database  : 'OtaY'
  });

  sqlConnection.connect(function(err)
  {
    if(err)
    {
      console.log("SQL Error: " + err);
      connected = false;
    }

    console.log(sqlConnection.threadId);
  });
}

processResults = function(err, results)
{
  console.log(results.insertId);
}

attemptConnect();
