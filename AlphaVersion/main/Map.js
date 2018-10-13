class Map {

    static load(map) {
        this.hasChanges = true;
        this.scl = 1;
        this.layers = map.layers;
        this.numRows = map.width;
        this.numCols = map.height;
        this.loadSpritesTiles(map);

       this.backgroundImage;
       this.map3DTiles = [];
        for (let i = 0; i < this.numRows; ++i) {
            this.map3DTiles[i] = [];
            for (let j = 0; j < this.numCols; ++j) {
                this.map3DTiles[i][j] = [];
            }
        }
        this.collidables = map.layers[0].objects;
        for (let l = 0; l < this.layers.length; ++l) {
            if (this.layers[l].type === "objectgroup") {
                continue;
            }
            for (let r = 0; r < this.numRows; ++r) {
                for (let c = 0; c < this.numCols; ++c) {
                    let index = c + r * (this.numCols);
                    let idImg = this.layers[l].data[index] - 1;
                    let x = r * Tile.SIZE;
                    let y = c * Tile.SIZE;
                    let collidable = this.collidables.filter((c) => c.x === x && c.y === y);
                    let breakable = true;
                    let resistance = 0;
                    if (collidable[0] !== undefined) {
                        breakable = collidable[0].properties.unbreakable;
                        resistance = collidable[0].properties.resistance;
                    }
                    this.map3DTiles[r][c][l] = new Tile(idImg, x, y, breakable, resistance);
                }
            }
        }
		
    }

    /*esto hay q cambiarlo lo hice asi nomas para safar pero habria que preguntar dada la posicion si los tres tiles son no collidabgles
    * osea el tile de esa posicion de cada capa en el arreglo map3d para cuando en el futuro tengamos que elmiinar blockes a tiros
    * podamos mostrar el tile del background */
    static getThereACollidable(x, y, w, h) {
        let collidableX = (posX) => { return Math.trunc(posX / Tile.SIZE) };
        let collidableY = (posY) => {return  Math.trunc(posY / Tile.SIZE) };

        // let index = c + r * (this.numCols);
        for (let l = 0; l < this.map3DTiles[0][0].length; ++l) {
            let c;
            let points = [{ px: x - w / 2, py: y - h / 2 }, { px: x + w / 2, py: y - h / 2 }, { px: x - w / 2, py: y + h / 2 }, { px: x + w / 2, py: y + h / 2 }]
            for (let i = 0; i < points.length; ++i) {
                c = this.map3DTiles[collidableY(points[i].py)][collidableX(points[i].px)][l];
                // c = this.collidables[collidableY(points[i].py) + collidableX(points[i].px) * this.numCols];
                // if (c !== undefined && (c.x <= (points[i].px) && (c.x + Tile.SIZE) >= (points[i].px) && c.y <= (points[i].py) && (c.y + Tile.SIZE) >= (points[i].py))) {
                //     return c;
                // }
                if(c!==undefined && !c.walkable){
                    return c;
                }
            }
        }
        return null;

        // let collidable = this.collidables.filter((c) => {
        //     return (c.x <= (x-w/2) && (c.x + Tile.SIZE) >= (x-w/2) && c.y <= (y-h/2) && (c.y + Tile.SIZE) >= (y-h/2))
        //     ||
        //     (c.x <= (x-w/2) && (c.x + Tile.SIZE) >= (x-w/2) && c.y <= (y+h/2) && (c.y + Tile.SIZE) >= (y+h/2))
        //     ||
        //     (c.x <= (x+w/2) && (c.x + Tile.SIZE) >= (x+w/2) && c.y <= (y-h/2) && (c.y + Tile.SIZE) >= (y-h/2))

        //     ||
        //     (c.x <= (x+w/2) && (c.x + Tile.SIZE) >= (x+w/2) && c.y <= (y+h/2) && (c.y + Tile.SIZE) >= (y+h/2))

        // });
        // if (collidable[0] !== undefined) {
        //     return collidable[0] ;
        // }

    }

    static loadSpritesTiles(map) {
        for (let i = 0; i < map.tilesets.length; ++i) {
            let sprImage = Assets.get(map.tilesets[i].source.slice(0, map.tilesets[i].source.length - 4));
            for (let y = 0; y < sprImage.height; y += Tile.SIZE) {
                for (let x = 0; x < sprImage.width; x += Tile.SIZE) {
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
        
        if (height < width) {
            this.scl = height / (this.numRows * Tile.SIZE);;
        }
        else {
            this.scl = width / (this.numCols * Tile.SIZE);
        }
        this.backgroundImage = createGraphics(Math.floor(Map.numRows * Tile.SIZE * this.scl),Math.floor(Map.numCols * Tile.SIZE * this.scl));
        this.hasChanges = true;
    }


    static render(camera) {
      if(this.backgroundImage === undefined) return;
        let xo = (width - this.numRows * this.scl * Tile.SIZE) / 2;
     
      translate(xo, 0);
      translate(-camera.xOffset * Tile.SIZE, -camera.yOffset * Tile.SIZE);
       /*
        let minX = floor(max(0, camera.xOffset));
        let minY = floor(max(0, camera.yOffset));
        let maxX = floor(min(this.numRows, camera.xOffset + camera.viewPortWidth +1));
        let maxY = floor(min(this.numCols, camera.yOffset + camera.viewPortHeight + 1));
*/	
		//scale(this.scl);
        
         if (this.hasChanges) {
            this.hasChanges = false;
  /*           this.backgroundImage.beginShape();
             for (let l = 1; l < this.layers.length; l++) {
                for (let y = minY; y < maxY; y++) {
                    for (let x = minX; x < maxX; x++) {
                        this.map3DTiles[x][y][l].render(this.backgroundImage);
                    }
                }
         }
         this.backgroundImage.endShape();
        }
        image(this.backgroundImage,0,0);
        */
          //this.backgroundImage = createImage(Map.numRows * Tile.SIZE, Map.numCols * Tile.SIZE);
          //this.backgroundImage = createImage(Map.numRows * Tile.SIZE, Map.numCols * Tile.SIZE);
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

			this.backgroundImage.beginShape();
            for (let l = 0; l < this.layers.length; ++l) {
                if (this.layers[l].type === "objectgroup") {
                    continue;
                }
                for (let r = 0; r < this.numRows; ++r) {
                    for (let c = 0; c < this.numCols; ++c) {
                        let index = c + r * (this.numCols);
                        let idImg = this.layers[l].data[index] - 2;
                        if (idImg < 0) { continue };
                      this.backgroundImage.image(TileManager.getTileImage(idImg),c * Tile.SIZE * this.scl,r*Tile.SIZE*this.scl,Tile.SIZE*this.scl,Tile.SIZE*this.scl);
                    }
                }
            }
			this.backgroundImage.endShape();
        
        }

        image(this.backgroundImage, 0, 0);
		scale(this.scl);
    }

    
}
