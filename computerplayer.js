var pongstatesim_js = require('./pongstatesim.js');

this.ComputerPlayer = function(arena, delegate)
{
  var sim = new pongstatesim_js.PongStateSim(arena, this);
  name = "COMPUTER";
  identity = "p1";
  control = false;

  var syncStateObj;
  
  this.emit = function(type, data)
  {
    switch(type)
    {
      case 'state':
        sim.setState(data);
        break;
      case 'queue':
        break;
      case 'identity':
        identity = data;
        break;
      case 'control':
        control = data;
        tick();
        break;
    }
  };

  this.hitPaddle = function(who)
  {
    sim.syncBallStateIntoObject(syncStateObj);
    delegate.computerSays('state', syncStateObj);
    syncStateObj.send = false; //already sent
    delegate.computerSays('concedeControl',true);
    control = false;
  };

  this.scoreOn = function(who)
  {
    sim.syncBallStateIntoObject(syncStateObj);
    delegate.computerSays('state', syncStateObj);
    syncStateObj.send = false; //already sent
    delegate.computerSays('concedeControl',true);
    control = false;
  };

  this.wallBounce = function()
  {
    sim.syncBallStateIntoObject(syncStateObj);
    syncStateObj.send = true;
  }

  var tick = function()
  {
    if(control) setTimeout(tick, 10);
    else return;

    syncStateObj = {"send":false};

    if(identity == "p1")
    {
      var oldvel = sim.p1yvel;
      if(sim.ballY > sim.p1y)  { sim.p1yvel = 2;  if(sim.p1y >= arena.height-(arena.paddleHeight/2)){ sim.p1y = arena.height-(arena.paddleHeight/2); sim.p1yvel = 0; }}
      if(sim.ballY < sim.p1y)  { sim.p1yvel = -2; if(sim.p1y <= arena.paddleHeight/2)               { sim.p1y = arena.paddleHeight/2;                sim.p1yvel = 0; }}
      if(sim.ballY == sim.p1y) { sim.p1yvel = 0; }
      if(sim.p1yvel != oldvel)
      {
        syncStateObj.p1y    = state.p1y;
        syncStateObj.p1yvel = state.p1yvel;
        syncStateObj.send = true;
      }
    }
    if(identity == "p2")
    {
      var oldvel = sim.p2yvel;
      if(sim.ballY > sim.p2y)  { sim.p2yvel = 2;  if(sim.p2y >= arena.height-(arena.paddleHeight/2)){ sim.p2y = arena.height-(arena.paddleHeight/2); sim.p2yvel = 0; }}
      if(sim.ballY < sim.p2y)  { sim.p2yvel = -2; if(sim.p2y <= arena.paddleHeight/2)               { sim.p2y = arena.paddleHeight/2;                sim.p2yvel = 0; }}
      if(sim.ballY == sim.p2y) { sim.p2yvel = 0; }
      if(sim.p2yvel != oldvel)
      {
        syncStateObj.p2y    = state.p2y;
        syncStateObj.p2yvel = state.p2yvel;
        syncStateObj.send = true;
      }
    }

    sim.tick();

    if(syncStateObj.send)
      delegate.computerSays('state',syncStateObj);
  }
}
