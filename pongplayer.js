this.PongPlayer = function(pongarena, pongsim, delegate)
{
  type = "COMPUTER"; //"HUMAN","COMPUTER","NET"

  name = "COMPUTER";
  identity = "p1";
  control = false;

  var tick = function()
  {
    if(control) setTimeout(tick, 10);
    else return;

    var yDestination = pongarena.height/2;
    switch(type)
    {
      case "COMPUTER":
        yDestination = pongsim.ballY;
        break;
      case "HUMAN":
        yDestination = mousY;
        break;
      case "NET":
        return; //syncs will take care of everything
        break;
    }

    if(identity == "p1")
    {
      var oldvel = pongsim.p1yvel;
      if(yDestination > pongsim.p1y)  { pongsim.p1yvel = 2;  if(pongsim.p1y >= pongarena.height-(pongarena.paddleHeight/2)){ pongsim.p1y = pongarena.height-(pongarena.paddleHeight/2); pongsim.p1yvel = 0; }}
      if(yDestination < pongsim.p1y)  { pongsim.p1yvel = -2; if(pongsim.p1y <= pongarena.paddleHeight/2)                   { pongsim.p1y = pongarena.paddleHeight/2;                    pongsim.p1yvel = 0; }}
      if(yDestination == pongsim.p1y) { pongsim.p1yvel = 0; }
      if(pongsim.p1yvel != oldvel)
        delegate.velocityChanged();
    }
    if(identity == "p2")
    {
      var oldvel = pongsim.p2yvel;
      if(yDestination > pongsim.p2y)  { pongsim.p2yvel = 2;  if(pongsim.p2y >= pongarena.height-(pongarena.paddleHeight/2)){ pongsim.p2y = pongarena.height-(pongarena.paddleHeight/2); pongsim.p2yvel = 0; }}
      if(yDestination < pongsim.p2y)  { pongsim.p2yvel = -2; if(pongsim.p2y <= pongarena.paddleHeight/2)                   { pongsim.p2y = pongarena.paddleHeight/2;                    pongsim.p2yvel = 0; }}
      if(yDestination == pongsim.p2y) { pongsim.p2yvel = 0; }
      if(pongsim.p2yvel != oldvel)
        delegate.velocityChanged();
    }
  }
}
