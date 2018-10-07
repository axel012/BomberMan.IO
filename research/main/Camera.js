class Camera {
    constructor(viewPortWidth, viewPortHeight) {
        this.xOffset = 0;
        this.yOffset =0;
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;
    }

	fix(){
		if(this.xOffset < 0)
			this.xOffset = 0;
		else if(this.xOffset > Map.mapWidth - width/Tile.SIZE){
			this.xOffset = 0;
		}
		if(this.yOffset < 0)
			this.yOffset = 0;
		else if(this.yOffset > Map.mapHeight - height/Tile.SIZE){
			this.yOffset = Map.mapHeight - height/Tile.SIZE
		}
	}

/*    move(amtX, amtY) {
        this.xOffset += amtX;
        this.yOffset += amtY;
        }*/

    followEntity(e){
		this.xOffset = (e.x - width/2)/Tile.SIZE;
		this.yOffset = (e.y - height/2)/Tile.SIZE;
		this.fix();
	}
    
}
