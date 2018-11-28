import {Map} from './map';
import { Tile } from './tile';

export class Camera {
    xOffset:number;
    yOffset:number;
    viewPortWidth:number;
    viewPortHeight:number;

    constructor(viewPortWidth, viewPortHeight) {
        this.xOffset = 0;
        this.yOffset =0;
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;
    }
    
    followEntity(e,ctx){
		if(ctx.width>ctx.height){
			this.xOffset=0;
            this.yOffset = (e.y*Map.scl - ctx.height/2);
            if( this.yOffset  < 0)
                this.yOffset = 0;
            else if( this.yOffset  > Map.numRows*Tile.SIZE*Map.scl - ctx.height){
                this.yOffset =  Map.numRows*Tile.SIZE*Map.scl - ctx.height;
            }
		}else{
            this.xOffset =( e.x*Map.scl - ctx.width/2);
            this.yOffset = 0;
           if(this.xOffset < 0)
                this.xOffset = 0;
            else if(this.xOffset > Map.numCols*Tile.SIZE*Map.scl - ctx.width){
                this.xOffset = Map.numCols*Tile.SIZE*Map.scl - ctx.width;
            }
		}
	
	}
}
