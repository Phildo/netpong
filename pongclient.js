this.PongClient = function()
{
  var canv;
  var s;
  var pongarena;
  var pongstatesim;
  var pongrenderer;

  var control = false;
  var myMouseY = 160;
  var identity = "queued";
  var syncStateObj;

  var queue = [];

  this.init = function()
  {
    s = io.connect('http://phildogames.com:4029'); //lol '4029' == 'PONG'... kinda...
    s.on('state',    function(data){ pongstatesim.setState(data); });
    s.on('queue',    function(data){ queue    = data;             });
    s.on('identity', function(data){ identity = data;             });
    s.on('control',  function(data){ control  = data;             });

    canv         = new Canv(640,320);
    pongarena    = new this.PongArena(640,320,20,100,20); //Changes must be duplicated on the server!
    pongstatesim = new this.PongStateSim(pongarena, this); 
    pongplayer1  = new this.PongPlayer(pongarena, pongstatesime, this, "p1", "COMPUTER");
    pongplayer2  = new this.PongPlayer(pongarena, pongstatesime, this, "p2", "COMPUTER");
    pongrenderer = new this.PongRenderer(canv, pongarena, pongstatesim);

    canv.canvas.style.border = '1px solid black';
    document.getElementById('render_area').insertBefore(canv.canvas,document.getElementById('shadow'));

    this.tick();
  }

  this.hitPaddle = function(who)
  {
    if(!control) return;
    sim.syncBallStateIntoObject(syncStateObj);
    s.emit('state',syncStateObj);
    syncStateObj.send = false; //already sent
    s.emit('concedeControl',true);
    control = false;
  };

  this.scoreOn = function(who)
  {
    if(!control) return;
    sim.syncBallStateIntoObject(syncStateObj);
    s.emit('state',syncStateObj);
    syncStateObj.send = false; //already sent
    s.emit('concedeControl',true);
    control = false;
  };

  this.velocityChanged = function()
  {

  }
  this.wallBounce = function()
  {
    if(!control) return;
    sim.syncBallStateIntoObject(syncStateObj);
    syncStateObj.send = true;
  };
    
  this.tick = function()
  {
    setTimeout(this.tick, 10);
    pongplayer1.tick();
    pongplayer2.tick();
    pongstatesim.tick();

    if(syncStateObj.send)
    {
      s.emit('state',syncStateObj);
    }

    pongrenderer.render();
  }

  var register = function()
  {
    s.emit('registered',document.getElementById('rname').value);
  }

  this.init();
};
