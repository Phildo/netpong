this.Player = function(type)
{
  this.type = type;
  this.y = 160;
  this.score = 0;
  this.delta = 0;
  this.emitState = false;
  
  var oldDelta;
  this.moveTowards = function(toY)
  {
    oldDelta = this.delta;
    if     (this.y < toY) { this.y+=2; this.delta = 2;  }
    else if(this.y > toY) { this.y-=2; this.delta = -2; }
    else                               this.delta = 0;
    
    if(this.y > 295) { this.y = 295; this.delta = 0; }
    if(this.y < 25)  { this.y = 25;  this.delta = 0; }

    if(this.delta != oldDelta) this.emitState = true;
  }
}
