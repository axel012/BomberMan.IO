var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000, function() {
  console.log('listening');
});


var clients = [];
var players = [];

io.on('connection', function(socket) {
 
 let player = new Player()
 console.log(player);
 players.push(player);
  socket.player = player;
  
  
  socket.on('_ping', function() {
    socket.emit('_pong');
  });
  
  socket.on("move",(data)=>{
	  /*socket.player.pos.x +=   2 * data.RIGHT;
	  socket.player.pos.x +=  -2 * data.LEFT;
	  socket.player.pos.y +=  2 * data.DOWN;
	  socket.player.pos.y +=  -2 * data.UP;	 
	  if(socket.player.pos.x < 0) socket.player.pos.x = 0;
	  if(socket.player.pos.x + 50 > 400) socket.player.pos.x = 350;
	  if(socket.player.pos.y < 0) socket.player.pos.y = 0;
	  if(socket.player.pos.y + 50 > 400) socket.player.pos.y = 350;
	  */
  });
  
  socket.on("disconnect",function(){
	  players.splice(players.indexOf(socket.player),1);
  });
  
});

class Player{
	constructor(){
		this.pos = {x:0,y:0};
	}
}

var pos = {x:0,y:0};

var loopAsync = function() {
  setImmediate(loop);
}

function loop() {
 
  let now = Date.now();
  if(last + updateRate <= now){
  let delta = (now - last)/1000;
  last = now;
 if(players.length > 0)
	io.emit("state",players);
}
  loopAsync();
}


	



var last = Date.now();
var gameLoops = 0;
var updateRate = 1000/22;
var minUpdateRate = 16;
var state = { time: Date.now(), loopDelta: 0, loops: gameLoops };
last = Date.now();
loopAsync();


