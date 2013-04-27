this.PongStateSim = function(pongarena, delegate)
{
  this.p1y    = pongarena.height/2;
  this.p1yvel = 0;
  this.p2y    = pongarena.height/2;
  this.p2yvel = 0;

  this.bx     = pongarena.width/2;
  this.bxvel  = 0;
  this.by     = pongarena.height/2;
  this.byvel  = 0;

  this.init = function()
  {
    this.setState({
      "p1y":pongarena.height/2,
      "p1yvel":0,
      "p2y":pongarena.height/2,
      "p2yvel":0,
      "bx":pongarena.width/2,
      "bxvel":-2,
      "by":pongarena.height/2,
      "byvel":-2
    });
  }

  this.setState = function(stateObj)
  {
    if(stateObj.p1y)    this.p1y    = stateObj.p1y;
    if(stateObj.p1yvel) this.p1yvel = stateObj.p1yvel;
    if(stateObj.p2y)    this.p2y    = stateObj.p2y;
    if(stateObj.p2yvel) this.p2yvel = stateObj.p2yvel;
    if(stateObj.bx)     this.bx     = stateObj.bx;
    if(stateObj.bxvel)  this.bxvel  = stateObj.bxvel;
    if(stateObj.by)     this.by     = stateObj.by;
    if(stateObj.byvel)  this.byvel  = stateObj.byvel;
  };

  this.getState = function()
  {
    return {
      "p1y":this.p1y,
      "p1yvel":this.p1yvel,
      "p2y":this.p2y,
      "p2yvel":this.p2yvel,
      "bx":this.bx,
      "bxvel":this.bxvel,
      "by":this.by,
      "byvel":this.byvel,
      };
  };

  this.syncBallStateIntoObject = function(syncObj)
  {
    syncObj.bx    = this.bx;
    syncObj.bxvel = this.bxvel;
    syncObj.by    = this.by;
    syncObj.byvel = this.byvel;
  };

  this.tick = function()
  {
    this.p1y += this.p1yvel;
    this.p2y += this.p2yvel;
    this.bx  += this.bxvel;
    this.by  += this.byvel;

    if(this.bx <= (2*pongarena.paddleWidth)+(pongarena.ballSize/2)           && this.bx >= pongarena.paddleWidth-(pongarena.ballSize/2) &&                  //eligible for collision with p1
       this.by <= this.p1y+(pongarena.paddleHeight/2)+(pongarena.ballSize/2) && this.by >= this.p1y-(pongarena.paddleHeight/2)-(pongarena.ballSize/2))      //collides with p1
    {
      this.bxvel *= -1;
      delegate.hitPaddle('p1');
    }
    if(this.bx <= pongarena.ballSize/2)               //Score behind p1
    {
      this.bxvel *= -1;
      delegate.scoreOn('p1');
    }

    if(this.bx <= pongarena.width-pongarena.paddleWidth+(pongarena.ballSize/2)   && this.bx >= pongarena.width-(2*pongarena.paddleWidth)-(pongarena.ballSize/2) &&  //eligible for collision with p2
      this.by <= this.p2y+(pongarena.paddleHeight/2)+(pongarena.ballSize/2) && this.by >= this.p2y-(pongarena.paddleHeight/2)-(pongarena.ballSize/2))       //collides with p2
    {
      this.bxvel *= -1;
      delegate.hitPaddle('p2');
    }
    if(this.bx >= pongarena.width-(pongarena.ballSize/2)) //Score behind p2
    {
      this.bxvel *= -1;
      delegate.scoreOn('p2');
    }
    
    if(this.by <= pongarena.ballSize/2 || this.by >= pongarena.height-(pongarena.ballSize/2)) //Top/Bottom wall bounce
    {
      this.byvel *= -1;
      delegate.wallBounce();
    }
  };

  this.init();
};
