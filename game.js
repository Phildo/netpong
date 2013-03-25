var p = require("./player.js");

this.bx;
this.by;
var bxvel;
var byvel;
var passP1;
var passP2;

this.p1;
this.p2;

this.init = function(p1type, p2type)
{
  this.p1 = new p.Player(p1type);
  this.p2 = new p.Player(p2type);
  
  this.bx = 320;
  this.by = 160;
  passP1 = false;
  passP2 = false;
  bxvel = Math.random()+1;
  byvel = 2-bxvel;
  if(Math.random() > 0.5) bxvel *= -1;
  if(Math.random() > 0.5) byvel *= -1;
}
  
this.tick = function()
{
  if(this.p1.type == "computer")
    this.p1.moveTowards(this.by);
  if(this.p2.type == "computer")
    this.p2.moveTowards(this.by);
  
  this.bx += bxvel;
  this.by += byvel;

  if(!passP1 && this.bx <= 25)
  {
    if(this.by <= this.p1.y+30 && this.by >= this.p1.y-30)
      bxvel *= -1;
    else passP1 = true;
  }

  if(!passP2 && this.bx >= 615)
  {
    if(this.by <= this.p2.y+30 && this.by >= this.p2.y-30)
      bxvel *= -1;
    else passP2 = true;
  }
  if(passP2 && this.bx >= 615)
    passP2 = false;

  //Wall bounce
  if(this.bx <= 5)   bxvel *= -1;
  if(this.bx >= 635) bxvel *= -1;
  if(this.by <= 5)   byvel *= -1;
  if(this.by >= 315) byvel *= -1;
  
  //Speed up
  if(bxvel >= 20) bxvel = 20;
  else bxvel *= 1.00025;
  if(byvel >= 20) byvel = 20;
  else byvel *= 1.00025;
}
