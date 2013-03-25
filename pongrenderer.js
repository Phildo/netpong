var renderPong = function(c, bx, by, p1, p2) // canv, ballx, bally, player1y, player2y,
{
  c.context.fillStyle = "#000000";
  c.context.fillRect(0,0,640,320);

  c.context.fillStyle = "#FFFFFF";
  c.context.fillRect(10,p1-25,10,50);
  c.context.fillRect(620,p2-25,10,50);
  c.context.fillRect(bx-5,by-5,10,10);
}
