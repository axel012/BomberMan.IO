class TileManager{
	
	static registerTile(img,walkable){
		if(this.tiles === undefined){
			this.tiles = [];
		}
		this.tiles.push(new Tile(img,walkable));
	}
	
	static getTile(id){
		return this.tiles[id];
	}
	
}

class Tile{
	static get SIZE(){return 16;}
	constructor(img,walkable){
		this.img = img;
		this.walkable = walkable;
	}
	render(x,y){
		image(this.img,x * Tile.SIZE,y * Tile.SIZE);
	}
}