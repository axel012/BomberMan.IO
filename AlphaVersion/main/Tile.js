class TileManager {

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

    render(id) {
        image(TileManager.getTileImage(id), this.posX * Tile.SIZE, this.posY * Tile.SIZE);
    }
}