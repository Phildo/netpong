this.PongRenderer = function(c, arena, sim)
{
  this.render = function()
  {
    c.context.fillStyle = "#000000";
    c.context.fillRect(0,0,arena.width,arena.height);
  
    c.context.fillStyle = "#FFFFFF";
    c.context.fillRect(arena.paddleWidth,                 sim.p1y-(arena.paddleHeight/2), arena.paddleWidth, arena.paddleHeight);
    c.context.fillRect(arena.width-(2*arena.paddleWidth), sim.p2y-(arena.paddleHeight/2), arena.paddleWidth, arena.paddleHeight);
    c.context.fillRect(sim.bx-(arena.ballSize/2), sim.by-(arena.ballSize/2), arena.ballSize, arena.ballSize);
  };
};
