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
 //   render() { }
}


class Player extends Entity {
    static get size() { return 30; }
	static get SPEED(){ return 2 / Tile.SIZE}
    constructor(x, y) {
        super(x, y, Player.size/Tile.SIZE, Player.size/Tile.SIZE);
        this.speed = 2/Tile.SIZE;
//        Stage.getInstance().registerKeyListener(() => {
 //           this.handleKeys();
 //       });
        this.maxBombs = 1;
        this.currentBombs = 0;
    }

    checkCollision(testx,testy){
        let t = Map.getTileByPos(floor(testx/Tile.SIZE),floor(testy/Tile.SIZE));
    }

    move(){
        this.moveX();
        this.moveY();
    }
        
        moveX(){
            if(this.xMove > 0){
            let tx = Math.floor((this.x + this.xMove + this.w));
            if(!this.collisionWithTile(tx, Math.floor(this.y))
            && !this.collisionWithTile(tx, Math.floor(this.y + this.h))){
             this.x+= this.xMove;
            }else{
            this.x = tx - this.w;
            }
            }else if(this.xMove < 0){
             let tx = Math.floor((this.x + this.xMove));
                 if(!this.collisionWithTile(tx, Math.floor((this.y)))
                 && !this.collisionWithTile(tx, Math.floor((this.y + this.h )))){
                 this.x+= this.xMove;
                }
            }
        }
  
         moveY(){
    if (this.yMove < 0){
        let ty = Math.floor((this.y + this.yMove));
        if(!this.collisionWithTile(Math.floor(this.x), ty) &&
           !this.collisionWithTile(Math.floor((this.x + this.w)), ty)){
            this.y += this.yMove;
        }
    }else if(this.yMove > 0){
        let ty = Math.floor((this.y + this.yMove + this.h));
        if(!this.collisionWithTile(Math.floor(this.x), ty) &&
           !this.collisionWithTile(Math.floor((this.x + this.w)), ty)){
            this.y += this.yMove;
        }
    }
        }
  
        
        collisionWithTile(tx,ty){
            return Map.getTileByPos(tx,ty) !== 0;
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

       // if (keyIsDown(32)) {
       //     this.placeBomb();
        //}
    }

    update() {
    this.move();
    }

    placeBomb() {
       // if (this.currentBombs < this.maxBombs && this.currentCooldown <= 0) {
        //    this.currentBombs++;
        //    Stage.getInstance().addEntity(new Bomb(this));
        //    this.currentCooldown = this.cooldown;
       // }
    }


}


module.exports = {Entity,Player};