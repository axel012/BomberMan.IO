class TileManager {

    static registerTile(idImg, x, y, breakable, resistance) {
        if (this.tiles === undefined) {
            this.tiles = [];
        }
        this.tiles.push(new Tile(idImg, x, y, breakable, resistance));
    }

    static getTile(id) {
        return this.tiles[id];
    }

    static registerTileImage(img) {
        if (this.imagesTiles === undefined) {
            this.imagesTiles = [];
        }
        else {
            this.imagesTiles.push(img);
        }
    }

    static getTileImage(id) {
        return this.imagesTiles[id];
    }
}

class Tile {
    static get SIZE() {
        return 32;
    }

    constructor(idImg, x, y, breakable, resistance) {
        if (breakable && resistance === 0) {
            this.walkable = true;
        }
        else {
            this.walkable = false;
        }
        this.idImg = idImg;
        this.posX = x;
        this.posY = y;
        this.breakable = breakable;
        this.resistance = resistance;
    }

    render(g) {
        g.image(TileManager.getTileImage(this.idImg), this.posX * Tile.SIZE, this.posY * Tile.SIZE);
		// g.fill(255,0,0);
		// g.textSize(15);
		// g.textAlign(CENTER,CENTER);
	
		// g.text(this.idImg,this.posX * Tile.SIZE,this.posY * Tile.SIZE,Tile.SIZE,Tile.SIZE);
    }
}