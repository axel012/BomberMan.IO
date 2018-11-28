class Camera {
    constructor(viewPortWidth, viewPortHeight) {
        this.xOffset = 0;
        this.yOffset =0;
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;
    }

/*	fix(){
		if(this.xOffset < 0)
			this.xOffset = 0;
		else if(this.xOffset > Map.numCols*Tile.SIZE*Map.scl - width){
			this.xOffset = Map.numCols*Tile.SIZE*Map.scl - width;
		}
		if(this.yOffset < 0)
			this.yOffset = 0;
		else if(this.yOffset > Map.numRows*Tile.SIZE*Map.scl - height){
			this.yOffset =  Map.numRows*Tile.SIZE*Map.scl - height;
		}
	}*/

/*    move(amtX, amtY) {
        this.xOffset += amtX;
        this.yOffset += amtY;
        }*/

    followEntity(e){
		if(width>height){
			this.xOffset=0;
            this.yOffset = (e.y*Map.scl - height/2);
            if( this.yOffset  < 0)
                this.yOffset = 0;
            else if( this.yOffset  > Map.numRows*Tile.SIZE*Map.scl - height){
                this.yOffset =  Map.numRows*Tile.SIZE*Map.scl - height;
            }
		}else{
            this.xOffset =( e.x*Map.scl - width/2);
            this.yOffset = 0;
           if(this.xOffset < 0)
                this.xOffset = 0;
            else if(this.xOffset > Map.numCols*Tile.SIZE*Map.scl - width){
                this.xOffset = Map.numCols*Tile.SIZE*Map.scl - width;
            }
		}
		/*this.xOffset = e.x - width/2;
		this.yOffset = e.y - height/2;*/
		/*this.fix();*/
	}
    
}
