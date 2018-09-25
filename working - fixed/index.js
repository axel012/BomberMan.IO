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


app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000, function() {
  console.log('listening');
});

io.on('connection', (socket)=>{
 //add player to stage
 //add position and socket
 let p;
 if(Stage.Instance.players.length == 0){
    p = new Player(1,1)
 }else if(Stage.Instance.players.length == 1){
    p = new Player(12,1);
 }else if(Stage.Instance.players.length == 2){
    p = new Player(1,12);
 }else if(Stage.Instance.players.length == 3){
    p = new Player(12,12);
 }
 socket.emit("current_players",Stage.Instance.players);
 io.emit("player_join",p);
 if(p !== undefined){
    p.id = socket.id;
    socket.player = p;
}
// io.to(socket.id).emit("wesa");
 Stage.Instance.addPlayer(p);

 socket.emit("map_data",TileMap.data);
 
 socket.on("disconnect",function(){
     io.emit("player_leave",Stage.Instance.players.indexOf(p));
    Stage.Instance.removeEntity(p);
});

socket.on("move",(data)=>{
    socket.player.handleKeys(data)
});
});

Map.load(TileMap.data);

class Stage{
    
    static get Instance() {
        if (this.instance == undefined) {
            this.instance = new Stage();
        }
        return this.instance;
    }

    constructor(){
        this.players = [];
        this.bombs = [];
    }
    
    addPlayer(p){
        this.players.push(p);
    }
    addEntity(e){
      //  if(e instanceof Player){
       //     this.players.push(e)
       // }
      //  if(e instanceof Bomb){
       //     this.bombs.push(e);
       // }
    }

    removeEntity(e){
        if(e instanceof Player){
            this.players.splice(this.players.indexOf(e), 1);
        }
       // if(e instanceof Bomb){
       //     this.bombs.splice(this.bombs.indexOf(e), 1);
       // }
    }

    update(){
        for(let p of this.players){
            p.update();
        }
        for(let b of this.bombs){
            b.update();
        }
    }

}


var loopAsync = function() {
    setImmediate(loop);
  }

function loop() {
 
    let now = Date.now();
    if(last + updateRate <= now){
    let delta = (now - last)/1000;
    last = now;
    Stage.Instance.update();
    io.emit("player_state",Stage.Instance.players);
  }
    loopAsync();
  }
  
      
  
  
  
  var last = Date.now();
  var updateRate = 1000/60;
  last = Date.now();
  loopAsync();
  