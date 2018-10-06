class Map {

    static load(map) {
        this.TileSIZE = 32;
        this.mapWidth = map.width;
        this.layers = map.layers;
        this.numRows = map.width;
        this.numCols = map.height;
        this.spritesImages = [];
        this.getSpritesImages(map);
    }

    static render() {

        for (let l = 0; l < this.layers.length; ++l) {
            if (this.layers[l].type === "objectgroup") {
                continue;
            }
            for (let r = 0; r < this.numRows; ++r) {
                for (let c = 0; c < this.numCols; ++c) {
                    let index = c + r * (this.numCols);
                    this.loadTile(r, c, this.layers[l].data[index] - 1);
                }
            }
        }
    }

    static loadTile(nrow, ncol, id) {

        if (id !== -1) {
            let x = (width - this.mapWidth*this.TileSIZE) / 2 + ncol * this.TileSIZE;
            let y = nrow * this.TileSIZE
            image(this.spritesImages[id], x, y);
        }

    }


    static getSpritesImages(map) {

        let indexid = 0;
        for (let i = 0; i < map.TileImages.length; ++i) {
            let sprImage = Assets.get(map.TileImages[i]);
            const w = sprImage.width;
            const h = sprImage.height;
            const colCount = Math.floor(w / this.TileSIZE);
            const rowCount = Math.floor(h / this.TileSIZE);
            for (let r = 0; r < rowCount; ++r) {
                for (let c = 0; c < colCount; ++c) {
                    let x = c * this.TileSIZE;
                    let y = r * this.TileSIZE;
                    this.spritesImages[indexid] = sprImage.get(x, y, this.TileSIZE, this.TileSIZE);
                    ++indexid;
                }
            }
        }
    }

}