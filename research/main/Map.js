class Map {

    static load(map) {
        this.hasChanges = true;
        this.scl = 1;
        this.layers = map.layers;
        this.numRows = map.width;
        this.numCols = map.height;
        this.loadSpritesTiles(map);
        this.backgroundImage={};
        this.map3DTiles=[];
        for (let i=0;i<this.numRows;++i) {
            this.map3DTiles[i] = [];
            for (let j=0;j<this.numCols;++j){
                this.map3DTiles[i][j] = [];
            }
        }
        this.collidables=map.layers[0].objects;
        for (let l = 0; l < this.layers.length; ++l) {
            if (this.layers[l].type === "objectgroup") {
                continue;
            }
            for (let r = 0; r < this.numRows; ++r) {
                for (let c = 0; c < this.numCols; ++c) {
                    let index = c + r * (this.numCols);
                    let idImg=this.layers[l].data[index] - 1;
                    let x=r*Tile.SIZE;
                    let y=c*Tile.SIZE;
                    let collidable=this.collidables.filter((c)=>c.x===x && c.y===y);
                    let breakable=true;
                    let resistance=0;
                    if(collidable[0]!==undefined){
                        breakable=collidable[0].properties.unbreakable;
                        resistance=collidable[0].properties.resistance;
                    }
                    this.map3DTiles[l][r][c]=new Tile(idImg,x,y,breakable,resistance);
                }
            }
        }
    }

    /*esto hay q cambiarlo lo hice asi nomas para safar pero habria que preguntar dada la posicion si los tres tiles son no collidabgles
    * osea el tile de esa posicion de cada capa en el arreglo map3d para cuando en el futuro tengamos que elmiinar blockes a tiros
    * podamos mostrar el tile del background */
    static isThereACollidable(x, y) {
        let collidable = this.collidables.filter((c) => { return c.x <= x && x <= (c.x + Tile.SIZE) && c.y <= y && y <= (c.y + Tile.SIZE)


        });
        if (collidable[0] !== undefined) {
            return false;
        }
        return true;
    }

    static loadSpritesTiles(map) {
        for (let i = 0; i < map.tilesets.length; ++i) {
            let sprImage = Assets.get(map.tilesets[i].source.slice(0, map.tilesets[i].source.length-4));
            for (let y = 0; y < sprImage.height; y+=Tile.SIZE) {
                for (let x = 0; x < sprImage.width; x+=Tile.SIZE) {
                    TileManager.registerTileImage(sprImage.get(x, y, Tile.SIZE, Tile.SIZE));
                }
            }
        }
    }
    /*static load(map) {
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
    }*/

    static onResize() {
        if (height < width){
            this.scl = height / (camera.viewPortHeight * Tile.SIZE);}
        else{
            this.scl = width / (this.numRows * Tile.SIZE);}


    }

    static render(camera) {

        let xo = (width - this.numRows * this.scl * Tile.SIZE) / 2;
        translate(xo, 0);
        translate(-camera.xOffset * Tile.SIZE, -camera.yOffset * Tile.SIZE);

        if (this.hasChanges) {
            this.hasChanges = false;
            this.backgroundImage = createImage(Map.numRows*Tile.SIZE, Map.numCols*Tile.SIZE);
            /*let minX = floor(max(0, camera.xOffset));
            let minY = floor(max(0, camera.yOffset));
            let maxX = floor(min(this.mapWidth, camera.xOffset + camera.viewPortWidth + 1));
            let maxY = floor(min(this.mapHeight, camera.yOffset + camera.viewPortHeight + 1));
            /!* let maxX = floor(this.mapWidth+camera.xOffset + 1);*!/


            for (let l = 0; l < this.layers.length; l++) {
                let layer = this.layers[l];
                for (let y = minY; y < maxY; y++) {
                    for (let x = minX; x < maxX; x++) {
                        let id = layer.tiles[x][y] - 1;
                        if (id < 0) continue;
                        /!*TileManager.getTile(id).render(x, y);*!/
                            this.backgroundImage.blend(TileManager.getTileImage(id), 0, 0, Tile.SIZE, Tile.SIZE, x*Tile.SIZE, y*Tile.SIZE, Tile.SIZE, Tile.SIZE, BLEND);

                    }
                }
            }*/
            for (let l = 0; l < this.layers.length; ++l) {
                if (this.layers[l].type === "objectgroup") {
                    continue;
                }
                for (let r = 0; r < this.numRows; ++r) {
                    for (let c = 0; c < this.numCols; ++c) {
                        let index = c + r * (this.numCols);
                        let idImg=this.layers[l].data[index] -2;
                        if (idImg < 0) {continue};
                        this.backgroundImage.blend(TileManager.getTileImage(idImg), 0, 0, Tile.SIZE, Tile.SIZE, c*Tile.SIZE, r*Tile.SIZE, Tile.SIZE, Tile.SIZE, BLEND);
                    }
                }
            }
        }
       else {
           image(this.backgroundImage,0, 0, Map.numCols*Tile.SIZE, Map.numRows*Tile.SIZE);
        }

    }
}
