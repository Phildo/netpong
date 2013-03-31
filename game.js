var p = require("./player.js");

this.emitState;
this.emitControl1;
this.emitControl2;

this.bx;
this.by;
this.bxvel;
this.byvel;
var passP1;
var passP2;

this.p1;
this.p2;
this.p1ToY;
this.p2ToY;

this.init = function(p1type, p2type)
{
  this.p1 = new p.Player(p1type);
  this.p2 = new p.Player(p2type);
  this.p1ToY = 160;
  this.p2ToY = 160;
  this.emitState = true;
  
  this.bx = 320;
  this.by = 160;
  passP1 = false;
  passP2 = false;
  this.bxvel = Math.random()+1;
  this.byvel = 2-this.bxvel;
  if(Math.random() > 0.5) this.bxvel *= -1;
  if(Math.random() > 0.5) this.byvel *= -1;

  this.emitControl1 = false;
  this.emitControl2 = false;
  if(p1type != "computer")
    this.emitControl1 = true;
  if(p2type != "computer")
    this.emitControl2 = true;
}
  
this.tick = function()
{
  if(this.p1.type == "computer") this.p1.moveTowards(this.by);
  else                           this.p1.moveTowards(this.p1ToY);
  if(this.p2.type == "computer") this.p2.moveTowards(this.by);
  else                           this.p2.moveTowards(this.p2ToY);
  
  this.bx += this.bxvel;
  this.by += this.byvel;

  if(!passP1 && this.bx <= 25)
  {
    if(this.by <= this.p1.y+30 && this.by >= this.p1.y-30)
    {
      this.bxvel *= -1;
      this.emitState = true;
    }
    else passP1 = true;
  }

  if(!passP2 && this.bx >= 615)
  {
    if(this.by <= this.p2.y+30 && this.by >= this.p2.y-30)
    {
      this.bxvel *= -1;
      this.emitState = true;
    }
    else passP2 = true;
  }

  //Wall bounce
  if(this.bx <= 5)   { this.bxvel *= -1; this.emitState = true; }
  if(this.bx >= 635) { this.bxvel *= -1; this.emitState = true; }
  if(this.by <= 5)   { this.byvel *= -1; this.emitState = true; }
  if(this.by >= 315) { this.byvel *= -1; this.emitState = true; }
  
  //Speed up
  /*
  if(this.bxvel >= 20) this.bxvel = 20;
  else this.bxvel *= 1.00025;
  if(this.byvel >= 20) this.byvel = 20;
  else this.byvel *= 1.00025;
  */
}

this.emitted = function()
{
  this.emitState = false;
  this.p1.emitState = false;
  this.p2.emitState = false;
};
