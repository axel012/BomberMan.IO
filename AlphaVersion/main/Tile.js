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

        this.idImg = idImg;
        this.posX = x;
        this.posY = y;
        this.breakable = breakable;
        this.resistance = resistance;
        this.walkable=()=>{return (this.breakable && this.resistance<=0)};
    }

    render(id) {
        image(TileManager.getTileImage(id), this.posX * Tile.SIZE, this.posY * Tile.SIZE);
    }
}