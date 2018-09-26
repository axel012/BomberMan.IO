class Tile {
    static get SIZE() { return 32; }
    //INITIALIZE TILES
    static initialize(){
        Tile.tiles = new AirTile(0,false);
        Tile.tiles = new BlockTile(1,true);
        Tile.tiles = new BlockTile(2,true);
        Tile.tiles = new BlockTile(3,true);
        Tile.tiles = new BlockTile(4,false);
        Tile.tiles = new BlockTile(5,true);
        Tile.tiles = new BlockTile(6,false);
    }
	
    static  getTileByID(index){
        return this._tiles[index];
    }

    static set tiles(value){
        if(!this._tiles){
            this._tiles = [];
        }
        this._tiles[value.index] = value;
    }

    constructor(index,collidable) {
        this.index = index;
        Tile.tiles = this;
		this.collidable = collidable;
    }
	
	isCollidable(){
		return this.collidable;
	}
   
}

class AirTile extends Tile {
    constructor(index,collidable) {
        super(index,collidable);
    }
}

class BlockTile extends Tile {
    constructor(index,collidable) {
        super(index,collidable);
    }
}

module.exports = {Tile,AirTile,BlockTile};