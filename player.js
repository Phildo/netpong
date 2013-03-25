this.Player = function(type)
{
  this.type = type;
  this.y = 160;
  this.score = 0;
  
  this.moveTowards = function(toY)
  {
    if(this.y < toY) this.y+=2;
    if(this.y > toY) this.y-=2;
    
    if(this.y > 295) this.y = 295;
    if(this.y < 25)  this.y = 25;
  }
}
