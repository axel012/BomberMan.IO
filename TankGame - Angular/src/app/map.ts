import { Tile, TileManager } from "./tile";
import { Assets } from "./assets";
import { Stage } from "./stage";

export class Map {

    static hasChanges:any;
    static scl:number;
    static layers:any;
    static numRows:number;
    static numCols:number;
    static backgroundImage:any;
    static map3DTiles:any;
    static collidables:any;

  

    static load(map,ctx) {
        this.hasChanges = true;
        this.scl = 1;
        this.layers = map.layers;
        this.numRows = map.width;
        this.numCols = map.height;
        this.loadSpritesTiles(map);

        this.backgroundImage = ctx.createImage(Math.floor(this.numCols * Tile.SIZE), Math.floor(Map.numRows * Tile.SIZE));
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
                    let idImg = this.layers[l].data[index] - 2;
                    let x = r * Tile.SIZE;
                    let y = c * Tile.SIZE;
                    let breakable = true;
		    let resistance = 0;
		    if(this.layers[l].name==="bloques"){
			let collidable = this.collidables.filter((c) => c.x === x && c.y === y);
			if (collidable[0] !== undefined) {
                       	   breakable = !collidable[0].properties.unbreakable;
                           resistance = collidable[0].properties.resistance;
                         }		
		    }
                    
                    this.map3DTiles[r][c][l] = new Tile(idImg, x, y, breakable, resistance);
                }
            }
        }

    }


    static getThereACollidable(x, y, w, h) {
        let collidableX = (posX) => {
            return Math.trunc(posX / Tile.SIZE);
        };
        let collidableY = (posY) => {
            return Math.trunc(posY / Tile.SIZE);
        };

        // let index = c + r * (this.numCols);
        for (let l = 0; l < this.map3DTiles[0][0].length; ++l) {
            let c;
            let points = [
		{px: x - w / 2, py: y - h / 2}, 
		{px: x + w / 2, py: y - h / 2},
                {px: x - w / 2, py: y + h / 2},
                {px: x + w / 2, py: y + h / 2},
                {px: x - w / 2, py: y},
                {px: x + w / 2, py: y},
                {px: x, py: y - h / 2},
                {px: x, py: y + h / 2}];
            for (let i = 0; i < points.length; ++i) {
                c = this.map3DTiles[collidableY(points[i].py)][collidableX(points[i].px)][l];
                if (c !== undefined && !c.walkable()) {
                    return c;
                }
            }
        }
        return null;

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


    static onResize(ctx) {

        if (ctx.height < ctx.width) {
            this.scl = ctx.width / (this.numRows * Tile.SIZE);

        }
        else {
            this.scl = ctx.height / (this.numCols * Tile.SIZE);
        }
        if (this.scl > 1) {
            this.scl = 1;
        } else if (this.scl < 1) {
            this.scl *= 0.9;
        }
        this.hasChanges = true;
    }


    static render(camera,ctx) {
        let xo = 0;
        if (ctx.height < ctx.width) {
            xo = (ctx.width - this.numCols * this.scl * Tile.SIZE) / 2;
        }
           
        camera.followEntity(Stage.Instance.mainPlayer,ctx);
        ctx.translate(xo, 0);
        let transx = (-camera.xOffset) === -0 ? 0 : (-camera.xOffset);
        let transy = (-camera.yOffset) === -0 ? 0 : (-camera.yOffset);

        ctx.translate(transx, transy);


        if (this.hasChanges) {
            this.hasChanges = false;

            for (let l = 0; l < this.layers.length; ++l) {
                if (this.layers[l].type === "objectgroup") {
                    continue;
                }
                for (let r = 0; r < this.numRows; ++r) {
                    for (let c = 0; c < this.numCols; ++c) {
                        let index = c + r * (this.numCols);
                        let idImg = this.layers[l].data[index] - 2;
                        if (idImg < 0) {
                            continue
                        }

                        this.backgroundImage.blend(TileManager.getTileImage(idImg), 0, 0, Tile.SIZE, Tile.SIZE, c * Tile.SIZE, r * Tile.SIZE, Tile.SIZE, Tile.SIZE, ctx.BLEND);
                    }
                }
            }


        }

        ctx.image(this.backgroundImage, 0, 0, Math.floor(this.numCols * Tile.SIZE * this.scl), Math.floor(this.numCols * Tile.SIZE * this.scl));
       // ctx.scale(this._scl);
    }


}
