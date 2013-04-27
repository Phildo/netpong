var io = require('socket.io').listen(4029);
io.set('log level',1);

var pongarena_js      = require('./pongarena.js');
var computerplayer_js = require('./computerplayer.js');
var playerq_js        = require('./playerq.js');
var arena = new pongarena_js.PongArena(640,320,20,100,20); //Duplicate this in client JS! (I know... I should have a config file. Eff that.)
var comp  = new computerplayer_js.ComputerPlayer(arena, this);
var q     = new playerq_js.PlayerQ(comp, this);

var emitState = function(s)
{
  s.emit('state',sim.getState());
  s.emit('queue',q.getQueue);
};

var connection = function(s)
{ 
  q.enqueue(s);

  var name = function(name)
  {
    io.sockets.emit('name',{"old":s.name,"new":name});
    s.name = name;
  }
  s.on('name',name);

  var state = function(state) //give authoritative control of state to anyone currently playing... == hackable, but really... it's pong...
  {
    if(s == q.p1() || s == q.p2()) 
    {
      s.broadcast.emit('state',state);
      comp.emit('state',state);
    }
  };
  s.on('state',state);

  var concedeControl = function(why) //disregard why for now
  {
    if(s == q.p1()) q.p2().emit('control',true);
    if(s == q.p2()) q.p1().emit('control',true);
  };
  s.on('concedeControl',concedeControl);

  var disconnect = function() 
  { 
    q.remove(s);
  };
  s.on('disconnect',disconnect);
};
io.sockets.on('connection',   connection);

//PlayerQ delegate
this.playersChanged = function()
{
  io.sockets.emit('queue',q.getQueue());
  q.p1().emit('identity','p1');

  if(q.p1() == comp) 
    q.p1().emit('control','false');
  else
  {
    q.p1().emit('control',true);
    q.p2().emit('identity','p2');
    q.p2().emit('control',false);
  }
};

//ComputerPlayer delegate
this.computerSays = function(type, data)
{
  switch(type)
  {
    case 'concedeControl':
      if(comp == q.p1()) q.p2().emit('control',data);
      if(comp == q.p2()) q.p1().emit('control',data);
      break;
    case 'state':
      if(comp == q.p1() || comp == q.p2())
        io.sockets.emit('state',data);
      break;
  }
};
