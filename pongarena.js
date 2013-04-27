this.PongArena = function(width, height, paddleWidth, paddleHeight, ballSize)
{
  return { 
    "width":        (width        ? width        : 640),
    "height":       (height       ? height       : 320),
    "paddleWidth":  (paddleWidth  ? paddleWidth  : 10),
    "paddleHeight": (paddleHeight ? paddleHeight : 30),
    "ballSize":     (ballSize     ? ballSize     : 5)
    };
};
