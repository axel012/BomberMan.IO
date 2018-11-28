const TileMap = {name:"map1",data:
{ "height":15,
 "layers":[
        {
         "data":[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
         "height":15,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"left-down",
 "tileheight":32,
 "tilesets":[
        {
         "columns":3,
         "firstgid":1,
         "image":"tiles.png",
         "imageheight":32,
         "imagewidth":96,
         "margin":0,
         "name":"Bomber",
         "spacing":0,
         "tilecount":3,
         "tileheight":32,
         "tilewidth":32,
         "transparentcolor":"#ff00ff"
        }],
 "tilewidth":32,
 "version":1,
 "width":15
}};

const Tile = require("../Tile/Tile.js").Tile;

class Map {

    //separated comma values
    static load(map) {
        const sp = map.layers[0].data;
        this.mapWidth = map.width;
        this.mapHeight = map.height;
        this.map = [];

      // this.scl = height / (this.mapHeight * Tile.SIZE);
        this.tiles = [];
        for (let y = 0; y < this.mapHeight; y++) {
            this.tiles.push(new Array(this.mapWidth));
            for (let x = 0; x < this.mapWidth; x++) {
                this.tiles[y][x] = sp[x + y * this.mapWidth];
              
            }
        }
      
    }
	
	static set IO(io){
		this.io = io;
	}

    static getTileByPos(x,y){
        if(x >= 0 && x < this.mapWidth && y >= 0 && y < this.mapHeight){
            return this.tiles[y][x];
        }
    }
	
	static setTile(x,y,index){
		this.tiles[y][x] = index;
		this.io.emit("map_update",{x,y,tileID:index});
	}

}

module.exports = {Map,TileMap};