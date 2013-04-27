this.PlayerQ = function(comp, delegate)
{
  var q  = [];

  this.getQueue = function()
  {
    return q.map(function(s){return s.name;});
  };

  this.p1 = function()
  {
    return q[0];
  };

  this.p2 = function()
  {
    return q[1];
  };

  this.enqueue = function(s)
  {
    var old0 = q[0];
    var old1 = q[1];
    removeComputerFromQueue();
    q[q.length] = s;
    addComputerToQueue();
    if(old0 != q[0] || old1 != q[1])
      delegate.playersChanged();
  };

  this.cycle = function()
  {
    var old0 = q[0];
    var old1 = q[1];
    removeComputerFromQueue();
    q[q.length] = q[0];
    q.splice(0,1);
    addComputerToQueue();
    if(old0 != q[0] || old1 != q[1])
      delegate.playersChanged();
  };

  this.remove = function(s)
  {
    var old0 = q[0];
    var old1 = q[1];
    for(var i = 0; i < q.length; i++)
      if(q[i] == s) q.splice(i,1);
    if(old0 != q[0] || old1 != q[1])
      delegate.playersChanged();
  };

  var removeComputerFromQueue = function()
  {
    //DON'T USE 'this.remove(...)'- don't want to call delegate
    for(var i = 0; i < q.length; i++)
    {
      if(q[i] == comp)
        q.splice(i,1);
    }
  };
  var addComputerToQueue = function()
  {
    //DON'T USE 'this.enqueue(...)'- don't want to call delegate
    q[q.length] = comp;
  };

  addComputerToQueue();
};
