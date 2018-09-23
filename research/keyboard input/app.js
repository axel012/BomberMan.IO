var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000, function() {
  console.log('listening');
});

io.on('connection', function(socket) {
  console.log('connected');
  socket.on('update', function(data) {
 
	switch(data){
		case 68: 
		pos.x+=5;
		break;
		case 65: 
		pos.x-=5;
		break;
		case 87:
		pos.y -=5;
		break;
		case 83:
		pos.y +=5;
		break;
	}
    socket.emit('update', state);
  });
  socket.on('state',(data)=>{
	  socket.emit('state',pos);

  });
});

var pos = {x:0,y:0};

var loopAsync = function() {
  setImmediate(loop);
}

function loop() {
  gameLoops++;
  var delta = Date.now() - last;
  last = Date.now();
  var currentState = {
    time: Date.now(),
    loopDelta: delta,
    loops: gameLoops
  };

  state = currentState;
  loopAsync();
}

var last = Date.now();
var gameLoops = 0;
var state = { time: Date.now(), loopDelta: 0, loops: gameLoops };
loopAsync();


