var io = require('socket.io').listen(4000);
var socket;

var receive = function(data) { socket.emit('tested',"world"); };
var connection = function(s) { socket = s; socket.on('test', receive); };
io.sockets.on('connection',connection);

var g = require('./game.js');
g.init("computer","computer");

var tick = function()
{
  g.tick();
  if(socket) 
  {
      socket.emit('state',
      { 
        bx:Math.round(g.bx), 
        by:Math.round(g.by), 
        p1y:Math.round(g.p1.y), 
        p2y:Math.round(g.p2.y) 
      }
    );
  }
  setTimeout(tick,10);
}

tick();
