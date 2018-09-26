const Tile = require("../Tile/Tile.js").Tile;
const Map = require("../Map/Map.js").Map;


class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    update() { }
}


class Player extends Entity {
    static get size() { return 30; }
	//static get SPEED(){ return 16 / Tile.SIZE}
    constructor(x, y) {
        super(x, y, Player.size/Tile.SIZE, Player.size/Tile.SIZE);
        this.speed = 2/Tile.SIZE;
        this.maxBombs = 3;
        this.currentBombs = 0;
    }

  

    move(dt){
        this.moveX(dt);
        this.moveY(dt);
    }
        
        moveX(dt){
            if((this.xMove * dt) > 0){
            let tx = Math.floor((this.x + (this.xMove * dt) + this.w));
            if(!this.collisionWithTile(tx, Math.floor(this.y))
            && !this.collisionWithTile(tx, Math.floor(this.y + this.h))){
             this.x+= this.xMove * dt;
            }else if(this.collisionWithTile(tx,Math.floor(this.y)) &&  this.collisionWithTile(tx,Math.floor(this.y + this.h)) === false){
			   this.y += 1/Tile.SIZE;
		   }else if(this.collisionWithTile(tx,Math.floor(this.y)) === false &&  this.collisionWithTile(tx,Math.floor(this.y + this.h))){
			   this.y -= 1/Tile.SIZE;
		   }
			
			//else{
            //this.x = tx - this.w -1/Tile.SIZE;
            }else if((this.xMove * dt) < 0){
             let tx = Math.floor((this.x + (this.xMove * dt)));
                 if(!this.collisionWithTile(tx, Math.floor((this.y)))
                 && !this.collisionWithTile(tx, Math.floor((this.y + this.h )))){
                 this.x+= this.xMove * dt;
                }else if(this.collisionWithTile(tx,Math.floor(this.y)) &&  this.collisionWithTile(tx,Math.floor(this.y + this.h)) === false){
			   this.y += 1/Tile.SIZE;
		   }else if(this.collisionWithTile(tx,Math.floor(this.y)) === false &&  this.collisionWithTile(tx,Math.floor(this.y + this.h))){
			   this.y -= 1/Tile.SIZE;
		   }
            }
        }
  
         moveY(dt){
			//moving up 
    if ((this.yMove * dt) < 0){
        let ty = Math.floor((this.y + (this.yMove * dt)));
        if(!this.collisionWithTile(Math.floor(this.x), ty) &&
           !this.collisionWithTile(Math.floor((this.x + this.w)), ty)){
            this.y += this.yMove * dt;
        }else if(this.collisionWithTile(Math.floor(this.x),ty) &&  this.collisionWithTile(Math.floor(this.x + this.w),ty) === false){
			   this.x += 1/Tile.SIZE;
		   }else if(this.collisionWithTile(Math.floor(this.x),ty) === false &&  this.collisionWithTile(Math.floor(this.x + this.w),ty)){
			   this.x -= 1/Tile.SIZE;
		   }
		
		//moving down
    }else if((this.yMove * dt) > 0){  
	
        let ty = Math.floor((this.y + (this.yMove*dt) + this.h));	
        if(!this.collisionWithTile(Math.floor(this.x), ty) &&
           !this.collisionWithTile(Math.floor((this.x + this.w)), ty)){		
            this.y += this.yMove * dt;
		   }else if(this.collisionWithTile(Math.floor(this.x),ty) &&  this.collisionWithTile(Math.floor(this.x + this.w),ty) === false){
			   this.x += 1/Tile.SIZE;
		   }else if(this.collisionWithTile(Math.floor(this.x),ty) === false &&  this.collisionWithTile(Math.floor(this.x + this.w),ty)){
			   this.x -= 1/Tile.SIZE;
		   }
		
    }
        }
  
        
        collisionWithTile(tx,ty){
            return Tile.getTileByID(Map.getTileByPos(tx,ty)).isCollidable();
        }

    handleKeys(data) {
        this.xMove = 0;
		this.yMove = 0;
        if (data.LEFT) this.xMove += -this.speed;
        if (data.RIGHT) this.xMove += this.speed;
        //s
        if (data.DOWN) this.yMove += this.speed;
        //w
        if (data.UP) this.yMove += -this.speed;
		if(!(this.xMove === 0 && this.yMove === 0))
			this.facing = this.xMove < 0 ? 0 : (this.xMove === 0 ? (this.yMove >= 0 ? 3 : 2) : 1);
		this.lastMove = this.facing;
		
		this.lastTimeMoving = Date.now();
		this.lastX = this.x;
		this.lastY = this.y;
		
		if(data.BOMBKEY) 
			this.placeBomb();
    }

    update(dt) {
    this.move(1);
	//console.log("don't know why change " + this.facing);
	if(this.lastTimeMoving){
		if(Date.now() - this.lastTimeMoving > 1000 ){
			if(this.x === this.lastX && this.y === this.lastY){
					this.facing = this.lastMove + 4;
			}
				this.lastX = this.x;
				this.lastY = this.y;
				this.lastTimeMoving = Date.now();
		//
//		}
	}
    }
}

    placeBomb() {
		if(Map.getTileByPos(Math.floor(this.x),Math.floor(this.y)) === 0){
		Stage.addEntity(new Bomb(this));
		}
		
    }


}

class Bomb extends Entity{
	    static get size() { return 32; }
	constructor(player){
		super(Math.floor(player.x + 0.5),Math.floor(player.y + 0.5),Bomb.size/Tile.SIZE,Bomb.size/Tile.SIZE);
		this.player = player;
		this.explosionRadius = 8;
		this.timer = 4000;
		this.last = Date.now();
		Map.setTile(this.x,this.y,4);
		setTimeout(()=>{
		Map.setTile(this.x,this.y,5);

		},500);
		this.exploded = false;
	}
	
	explode(){
		if(this.exploded) return;
		this.exploded = true;
		Stage.removeEntity(this);
		Map.setTile(this.x,this.y,0);
		Stage.addEntity(new Explosion(this.x,this.y,this.explosionRadius));
	}
	
	update(){
		this.timer -= (Date.now() - this.last);
		this.last = Date.now();
		if(this.timer <= 0){
			this.explode();
		}
	}

}


class Explosion extends Entity{
	static get size(){return 30;}
	constructor(x,y,r){
		super(x,y, Player.size/Explosion.SIZE, Player.size/Explosion.SIZE);
		this.r = r;
		this.tickTime = 2/60;
		this.tick_ = 0;
		this.canGoLeft = true;
		this.canGoRight = true;
		this.canGoUp = true;
		this.canGoDown = true;
		this.currentR = 0;
		this.area = [];
	}
	
	findBombAt(x,y){
		var b = null;
		for(var i = 0;i<Stage.bombs.length;i++){
			var b = Stage.bombs[i];
			if(b.exploded) continue;
			if(b.x == x && b.y == y){
				return b;
			}
 		}
		return null;
	}
	
	tick(){
		if(this.currentR >= this.r){
			this.destroy();
			return;
		}
		//RIGHT
		var tr = Map.getTileByPos(this.x + this.currentR,this.y);
		if(this.canGoRight){
			switch(tr){
				case 0:
				case 6:
				Map.setTile(this.x + this.currentR,this.y,6);
				this.area.push({x:this.x+this.currentR,y:this.y})
				break;
				case 1:
				Map.setTile(this.x + this.currentR,this.y,6);
				this.area.push({x:this.x+this.currentR,y:this.y})
				this.canGoRight = false;
				break;
				case 5:
				var b = this.findBombAt(this.x + this.currentR,this.y);
				if(b != null){
					b.explode();
				}
				this.canGoRight = false;
				//explode bomb
				break;
				default:
				this.canGoRight = false;
			}
		};
	
		//LEFT
		var tl = Map.getTileByPos(this.x - this.currentR,this.y);
		if(this.canGoLeft){
			switch(tl){
				case 0:
				case 6:
				Map.setTile(this.x - this.currentR,this.y,6);
				this.area.push({x:this.x - this.currentR,y:this.y})
				break;
				case 1:
				Map.setTile(this.x - this.currentR,this.y,6);
				this.area.push({x:this.x - this.currentR,y:this.y})
				this.canGoLeft = false;
				break;
				case 5:
				//explode bomb
				var b = this.findBombAt(this.x - this.currentR,this.y);
				if(b != null){
					b.explode();
				}
					this.canGoLeft = false;
				break;
				default:
				this.canGoLeft = false;
			}
		};
	
		
		
			var tu = Map.getTileByPos(this.x,this.y - this.currentR);
		if(this.canGoUp){
			switch(tu){
				case 0:
				case 6:
				Map.setTile(this.x,this.y  - this.currentR,6);
				this.area.push({x:this.x ,y:this.y  - this.currentR})
				break;
				case 1:
				Map.setTile(this.x,this.y -  this.currentR,6);
				this.area.push({x:this.x ,y:this.y - this.currentR})
				this.canGoUp = false;
				break;
				case 5:
				//explode bomb
				var b = this.findBombAt(this.x ,this.y - this.currentR);
				if(b != null){
					b.explode();
				}
				this.canGoUp = false;
				break;
				default:
				this.canGoUp = false;
			}
		};
			
				var td = Map.getTileByPos(this.x,this.y + this.currentR);
		if(this.canGoDown){
			switch(td){
				case 0:
				case 6:
				Map.setTile(this.x,this.y  + this.currentR,6);
				this.area.push({x:this.x ,y:this.y  + this.currentR})
				break;
				case 1:
				Map.setTile(this.x,this.y +  this.currentR,6);
				this.area.push({x:this.x ,y:this.y + this.currentR})
				this.canGoDown = false;
				break;
				case 5:
				//explode bomb
				var b = this.findBombAt(this.x ,this.y +  this.currentR);
				if(b != null){
					b.explode();
				}
				this.canGoDown = false;
				break;
				default:
				this.canGoDown = false;
			}
		}
			this.currentR++;
		}
	
	
	destroy(){
		for(var i=0;i<this.area.length;i++){
			Map.setTile(this.area[i].x,this.area[i].y,0);	
		}
		Stage.removeEntity(this);
	}
	
	update(dt){
		this.tick_ += dt;
		if(this.tick_ > this.tickTime){
			this.tick_ = 0;
			this.tick();
		}
	}
}

module.exports = {Entity,Player,Explosion,Bomb};
//fix to circular dependencies -> require stage later
const Stage = require("../Stage.js");