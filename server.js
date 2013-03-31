var io = require('socket.io').listen(4000);
io.set('log level',1);

var connection = function(s)
{ 
  var registered = function(name)
  {
    disconnect();
    s.name = name;
    for(var i = 0; i < queue.length; i++)
    {
      if(queue[i] == "computer")
      {
        queue.splice(i,1);
        i--;
      }
    }
    queue[queue.length] = s;
    queue[queue.length] = "computer";
    queue[queue.length] = "computer";
    
    if(g.p1.type == "computer" || g.p2.type == "computer")
      g.init(queue[0],queue[1]);
  };
  s.on('registered',registered);

  var move = function(y)
  {
    if     (g.p1.type == s) g.p1ToY = y;
    else if(g.p2.type == s) g.p2ToY = y;
  };
  s.on('move',move);

  var disconnect = function() 
  { 
    for(var i = 0; i < queue.length; i++)
    {
      if(queue[i] == s)
      {
        queue.splice(i,1);
        if(i < 2)
          g.init(queue[0],queue[1]);
      }
    }
  };
  s.on('disconnect',disconnect);

  emitState(s);
};

io.sockets.on('connection',   connection);

var g = require('./game.js');
var queue = ["computer","computer"]
g.init("computer","computer");

var emitState = function(to)
{
  to.emit('state',
    { 
      bx:Math.round(g.bx), 
      by:Math.round(g.by), 
      bxvel:g.bxvel, 
      byvel:g.byvel 
    }
  );
}

var emitControl = function(to)
{
  to.emit('control',true);
}

var emitP1State = function(to)
{
  to.emit('p1state',
    {
      py:g.p1.y,
      pyvel:g.p1.delta
    }
  );
}

var emitP2State = function(to)
{
  to.emit('p2state',
    {
      py:g.p2.y,
      pyvel:g.p2.delta
    }
  );
}

var tick = function()
{
  g.tick();
  if(g.emitState)
    emitState(io.sockets);
  if(g.emitControl1)
    emitControl(queue[0]);
  if(g.emitControl2)
    emitControl(queue[1]);
  if(g.p1.emitState)
    emitP1State(io.sockets);
  if(g.p2.emitState)
    emitP2State(io.sockets);
  g.emitted();
  setTimeout(tick,10);
}

tick();
