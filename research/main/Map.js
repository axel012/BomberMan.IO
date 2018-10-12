class Map {

    static load(map) {
        this.hasChanges = true;
        this.scl = 1;
        this.layers = map.layers;
        this.numRows = map.width;
        this.numCols = map.height;
        this.loadSpritesTiles(map);
        this.backgroundImage = {};
        this.map3DTiles = [];
        for (let i = 0; i < this.numRows; ++i) {
            this.map3DTiles[i] = [];
            for (let j = 0; j < this.numCols; ++j) {
                this.map3DTiles[i][j] = [];
            }
        }

		this.mapIMG = createGraphics(width,height);
        this.collidables = map.layers[0].objects;
        for (let l = 0; l < this.layers.length; ++l) {
            if (this.layers[l].type === "objectgroup") {
                continue;
            }
            for (let r = 0; r < this.numRows; ++r) {
                for (let c = 0; c < this.numCols; ++c) {
                    let index = c + r * (this.numCols);
                    let idImg = this.layers[l].data[index] - 1;
                    let x = r;
                    let y = c;
                   //this.collidables.filter((c) => c.x === x && c.y === y);
                    let breakable = true;
                    let resistance = 0;
                    //if (collidable[0] !== undefined) {
                    //    breakable = collidable[0].properties.unbreakable;
                    //    resistance = collidable[0].properties.resistance;
                   // }
                    this.map3DTiles[r][c][l] = new Tile(idImg, x, y, breakable, resistance);
                }
            }
        }
		 let collidable = {};
			for(let c = 0;c<this.collidables.length;c++){
				collidable[this.collidables[c].id] = this.collidables[c];
			}
			this.data = collidable;
			//liberar memoria
		    delete this.collidables;
    }

  /* DEJAME A MI LAS COLISIONES PIBE*/
    static getTileByPos(x,y){
		//0 object layer
		let tx = Math.floor(x);
		let ty = Math.floor(y);
		if(tx > this.numRows || ty > this.numCols || tx < 0 || ty < 0) return null;
		let data = [];
		for(var l = 1;l < this.layers.length;l++){
			data.push(this.map3DTiles[tx][ty][l]);
		}
		return data;
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
            this.scl = height / (camera.viewPortHeight * Tile.SIZE);
        }
        else {
            this.scl = width / (this.numRows * Tile.SIZE);
        }


    }

    static render(camera) {

        let xo = (width - this.numRows * this.scl * Tile.SIZE) / 2;
        translate(xo, 0);
        translate(-camera.xOffset * Tile.SIZE, -camera.yOffset * Tile.SIZE);
		
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
			
			if(this.hasChanges){
				console.log("render");
				this.hasChanges = false;
				this.mapIMG.beginShape();
				this.mapIMG.clear();
            for (let l = 0; l < this.layers.length; ++l) {
                if (this.layers[l].type === "objectgroup") {
                    continue;
                }
                for (let r = 0; r < this.numRows; ++r) {
                    for (let c = 0; c < this.numCols; ++c) {
                        let index = c + r * (this.numCols);
                        let idImg = this.layers[l].data[index] - 2;
                        if (idImg < 0) { continue };
                        this.map3DTiles[r][c][l].render(this.mapIMG);
						//this.backgroundImage.blend(TileManager.getTileImage(idImg), 0, 0, Tile.SIZE, Tile.SIZE, c * Tile.SIZE, r * Tile.SIZE, Tile.SIZE, Tile.SIZE, BLEND);
                    }
                }
            }
			this.mapIMG.endShape();
        }
		  image(this.mapIMG,0,0);
		}
    

    
}
