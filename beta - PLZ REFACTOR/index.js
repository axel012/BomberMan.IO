const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Tile module
const TileMod = require("./lib/Tile/Tile.js");
const AirTile = TileMod.AirTile;
const Tile = TileMod.Tile;
const BlockTile = TileMod.BlockTile;

//Entity module
const EntityMod = require("./lib/Entity/Entity.js");
const Entity = EntityMod.Entity;
const Player = EntityMod.Player;

//Map module
const MapMod = require("./lib/Map/Map.js");
const Map = MapMod.Map;
const TileMap = MapMod.TileMap;

//Stage module
const Stage = require("./lib/Stage.js");


app.use(express.static(path.join(__dirname, 'public')));
server.listen(3001,"10.0.22.52", function() {
  console.log('Listening port : 10.0.22.52:3001');
});

Map.IO = io;

io.on('connection', (socket)=>{
 //add player to stage
 //add position and socket
 let p;
 if(Stage.players.length == 0){
    p = new Player(1,1)
 }else if(Stage.players.length == 1){
    p = new Player(12,1);
 }else if(Stage.players.length == 2){
    p = new Player(1,12);
 }else if(Stage.players.length == 3){
    p = new Player(12,12);
 }
 socket.emit("current_players",Stage.players);
 io.emit("player_join",p);
 if(p !== undefined){
    p.id = socket.id;
    socket.player = p;
}
// io.to(socket.id).emit("wesa");
 Stage.addEntity(p);

 socket.emit("map_data",TileMap.data);
 socket.emit("current_map",Map.tiles);
 
 socket.on("disconnect",function(){
     io.emit("player_leave",Stage.players.indexOf(p));
    Stage.removeEntity(p);
});

socket.on("_ping",(data)=>{
	var time = Date.now() + data;
	socket.emit("_pong",time);
});

socket.on("move",(data)=>{
    socket.player.handleKeys(data);
	if(data.BOMBKEY === true){
		// io.emit("map_update",Map.tiles);
	}
});
});

Map.load(TileMap.data);
Tile.initialize();



var loopAsync = function() {
    setImmediate(loop);
  }

function loop() {
 
    let now = Date.now();
    if(last + updateRate <= now){
    let delta = (now - last)/1000;
    last = now;
    Stage.update(delta);
    io.emit("player_state",Stage.players);
  }
    loopAsync();
  }
  
      
  
  
  
  var last = Date.now();
  var updateRate = 1000/60;
  last = Date.now();
  loopAsync();
  