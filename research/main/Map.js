

class Map {

    static load(map) {
        this.layers = map.layers;
        this.mapWidth = map.width;
        this.mapHeight = map.height;
        this.hasChanges = true;
        this.laimagen={};
        for (let l = 0; l < this.layers.length; l++) {
            let layer = this.layers[l];
            layer.tiles = [];
            for (let x = 0; x < this.mapWidth; x++) {
                for (let y = 0; y < this.mapHeight; y++) {
                    layer.tiles.push(new Array(this.mapWidth));

                    layer.tiles[x][y] = layer.data[x + y * this.mapWidth];
                }
            }
        }
        this.scl = 1;
        //this.onResize();
    }

    static onResize() {
        if (height < width)
            this.scl = height / (camera.viewPortHeight * Tile.SIZE);
        else
            this.scl = width / (this.mapWidth * Tile.SIZE);


    }

    static render(camera) {

        let xo = (width - this.mapWidth * this.scl * Tile.SIZE) / 2;
        translate(xo, 0);
        //scale(this.scl);
        translate(-camera.xOffset * Tile.SIZE, -camera.yOffset * Tile.SIZE);

        if (this.hasChanges) {
            this.hasChanges = false;
            let minX = floor(max(0, camera.xOffset));
            let minY = floor(max(0, camera.yOffset));
            let maxX = floor(min(this.mapWidth, camera.xOffset + camera.viewPortWidth + 1));
            let maxY = floor(min(this.mapHeight, camera.yOffset + camera.viewPortHeight + 1));
            /* let maxX = floor(this.mapWidth+camera.xOffset + 1);*/
            this.laimagen = createImage(Map.mapWidth*Tile.SIZE, Map.mapHeight*Tile.SIZE);

            for (let l = 0; l < this.layers.length; l++) {
                let layer = this.layers[l];
                for (let y = minY; y < maxY; y++) {
                    for (let x = minX; x < maxX; x++) {
                        let id = layer.tiles[x][y] - 1;
                        if (id < 0) continue;
                        /*TileManager.getTile(id).render(x, y);*/
                            this.laimagen.blend(TileManager.getTile(id).img, 0, 0, Tile.SIZE, Tile.SIZE, x*Tile.SIZE, y*Tile.SIZE, Tile.SIZE, Tile.SIZE, BLEND);

                    }
                }
            }
        }
       else {
           image(this.laimagen,0, 0, Map.mapWidth*Tile.SIZE, Map.mapHeight*Tile.SIZE);
        }

    }
}
