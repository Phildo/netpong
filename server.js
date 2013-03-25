var io = require('socket.io').listen(4000);
var socket;

var receive = function(data) { socket.emit('tested',"world"); };
var connection = function(s) { socket = s; socket.on('test', receive); };
io.sockets.on('connection',connection);
