class Tile {
    static get SIZE() { return 32; }
    //INITIALIZE TILES
    static initialize(){
        Tile.tiles = new AirTile(0);
        Tile.tiles = new BlockTile(1);
        Tile.tiles = new BlockTile(2);
        Tile.tiles = new BlockTile(3);
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

    constructor(index) {
        this.index = index;
        Tile.tiles = this;
    }
   
}

class AirTile extends Tile {
    constructor(index) {
        super(index);
    }
}

class BlockTile extends Tile {
    constructor(index) {
        super(index);
    }
}

module.exports = {Tile,AirTile,BlockTile};