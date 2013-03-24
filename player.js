var Player = function(p,type)
{
  this.p = p;
  this.type = type;
  this.y = 160;
  this.tick = function() { ; };
  
  this.moveTowards = function(toY)
  {
    if(this.y < toY) this.y+=2;
    if(this.y > toY) this.y-=2;
    
    if(this.y > 295) this.y = 295;
    if(this.y < 25)  this.y = 25;
  };
  
  var self = this;
  var moveToMouse = function(){ self.moveTowards(mouseY); };
  var moveToBall  = function(){ self.moveTowards(by); };
  var moveToNet   = function(){ self.y = netY; };
  
  switch(this.type)
  {
    case "human":
      this.tick = moveToMouse;
      break;
    case "computer":
      this.tick = moveToBall;
      break;
    case "net":
      this.tick = moveToNet;
      break;
  }
}
