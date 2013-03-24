var renderPong = function(c, p1, p2, bx, by) // canv, player1y, player2y, ballx, bally
{
  c.context.fillStyle = "#000000";
  c.context.fillRect(0,0,640,320);

  c.context.fillStyle = "#FFFFFF";
  c.context.fillRect(10,p1-25,10,50);
  c.context.fillRect(620,p2-25,10,50);
  c.context.fillRect(bx-5,by-5,10,10);
}
