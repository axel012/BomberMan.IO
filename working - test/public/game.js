let mapImage;

function preload(){
mapImage = loadImage("tiles.png");
}

class Assets{

    static initialize(){
        this.Tile = [];
        this.Tile.push(mapImage.get(0,0,32,32));
        this.Tile.push(mapImage.get(32,0,32,32));
        this.Tile.push(mapImage.get(64,0,32,32));
    }
}

class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    update() { }
    render() { }
}



class Camera {
    constructor(viewPortWidth, viewPortHeight) {
        
        this.xOffset = 0;
        this.yOffset =0;
        this.viewPortWidth = viewPortWidth;
        this.viewPortHeight = viewPortHeight;
    }
    applyBounds(){
        if(this.xOffset < 0) {
            this.xOffset = 0;
            }else if(this.xOffset > 18 ) {
            this.xOffset =  18 ;
            }
    }

    move(amtX, amtY) {
        this.xOffset += amtX;
        this.yOffset += amtY;
        this.applyBounds();
        }

          followEntity(e){
            this.xOffset = ((e.x - ((width/2)/Map.scl))/Tile.SIZE);
            
          //  yOffset = e.getY() - handler.getHeight()/2 + e.getHeight()/2;
          this.applyBounds();
        }

    
        /*
        if(yOffset < 0){
            yOffset = 0;
            }else if(yOffset > handler.getWorld().getHeight()*Tile.TILEHEIGHT- handler.getHeight()){
            yOffset = handler.getWorld().getHeight()*Tile.TILEHEIGHT- handler.getHeight();
            }
            */
    
    

    
}

class Stage {

    constructor() {
        this.entities = [];
        this.players = [];
        this.keyListeners = [];
        this.camera = new Camera(15, 15);
//        console.log(this.camera);
//        this.player = new Player(50,50);
 //       this.addEntity(this.player);
    }


    static getInstance() {
        if (this.instance == undefined) {
            this.instance = new Stage();
        }
        return this.instance;
    }

    addEntity(e) {
        if (e instanceof Player)
            this.players.push(e);
        else
        if(e instanceof Bomb){
            this.entities.push(e);
            e.addListener(()=>{
             this.removeEntity(e);
            })
        }else
        {
            this.entities.push(e);
        }
    }

    removeEntity(playerIndex) {
        this.players.splice(playerIndex, 1);
    }

    render() {
        background(0);
        // translate(this.camera.x * Tile.SIZE,this.camera.y*Tile.SIZE);
        Map.render(this.camera);
        for (let e of this.entities) {
            e.render();
        }
        for (let p of this.players) {
            p.render();
        }
        fill(255);
 //       textSize(32);
 //       text("World Coordinates: " + stage.players[0].x + "," + stage.players[0].y,0,32,Map.SIZE,32);
 //       text("Screen Coordinates: " + stage.players[0].x * Tile.SIZE + ","+ stage.players[0].y * Tile.SIZE,0,64);
//      ellipse(32,32,15,15);
    }

    onKeyPressed() {

    }

    registerKeyListener(fun) {
        this.keyListeners.push(fun);
    }


    handleKeys() {
        for (let kl of this.keyListeners) {
            kl();
        }
    }

    update(dt) {
        for (let p of this.players) {
            p.update(dt);
   
        }
        for(let e of this.entities){
            e.update();
        }
    }

}

class Player extends Entity {
    static get size() { return 30; }

    constructor(x, y) {
        super(x, y, Player.size/Tile.SIZE, Player.size/Tile.SIZE);
        this.vx = 0;
        this.vy = 0;
        this.cooldown = 0;
        this.currentCooldown = 0;

        this.speed = 2/Tile.SIZE;
        Stage.getInstance().registerKeyListener(() => {
            this.handleKeys();
        });
        this.maxBombs = 3;
        this.currentBombs = 0;
    }
	
	datafromCopy(data){
		this.x = data.x;
		this.y = data.y;
		this.currentBombs = data.currentBombs; 
	}

    checkCollision(testx,testy){
        let t = Map.getTileByPos(floor(testx/Tile.SIZE),floor(testy/Tile.SIZE));
        console.log(t);
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

    handleKeys() {
        this.xMove = 0;
		this.yMove = 0;
        if (keyIsDown(65)) this.xMove += -this.speed;
        if (keyIsDown(68)) this.xMove += this.speed;
        //s
        if (keyIsDown(83)) this.yMove += this.speed;
        //w
        if (keyIsDown(87)) this.yMove += -this.speed;

        if (keyIsDown(32)) {
            this.placeBomb();
        }

    }





    update(dt) {
    this.move();
      //  this.x += this.vx;
      //  this.y += this.vy;
      //  this.vx *= 0;
      //  this.vy *= 0;
        if (this.currentCooldown > 0)
            this.currentCooldown--;
    }

    render() {
        push();
        translate(this.x*Tile.SIZE, this.y*Tile.SIZE);
        fill(255);
        rect(0, 0, this.w * Tile.SIZE, this.h * Tile.SIZE);
        pop();
    }

    placeBomb() {
        if (this.currentBombs < this.maxBombs && this.currentCooldown <= 0) {
            this.currentBombs++;
            Stage.getInstance().addEntity(new Bomb(this));
            this.currentCooldown = this.cooldown;
        }
    }


}

class Map {

    //separated comma values
    static load(map) {
        const sp = map.layers[0].data;
        this.mapWidth = map.width;
        this.mapHeight = map.height;
        this.map = [];

       this.scl = height / (this.mapHeight * Tile.SIZE);
        this.tiles = [];
        for (let y = 0; y < this.mapHeight; y++) {
            this.tiles.push(new Array(this.mapWidth));
            for (let x = 0; x < this.mapWidth; x++) {
                this.tiles[y][x] = sp[x + y * this.mapWidth];
              
            }
        }
      
    }

    static getTileByPos(x,y){
        if(x > 0 && x < this.mapWidth && y > 0 && y < this.mapHeight){
            return this.tiles[y][x];
        }
    }

    static render(camera) {
      //  push();
      let xo = (width - this.mapWidth * this.scl * Tile.SIZE)/2
       // let xo = (width / 5) / 2;
      translate(xo, 0);
            scale(this.scl);
       // translate(camera.x * Tile.SIZE, camera.y);
        translate(-camera.xOffset * Tile.SIZE,-camera.yOffset*Tile.SIZE);
       
        let minX = floor(max(0, camera.xOffset));
        let minY = floor(max(0, camera.yOffset));
        let maxX = floor(min(this.mapWidth, camera.xOffset + camera.viewPortWidth +1));
        let maxY = floor(min(this.mapHeight, camera.yOffset + camera.viewPortHeight + 1));
        for (let y = minY; y < maxY; y++) {
            for (let x = minX; x < maxX; x++) {
             Tile.getTileByID(Number(this.tiles[y][x])).render(x*Tile.SIZE,y*Tile.SIZE);
                // this.tiles[y][x].render();
                              }
        }
        //noLoop();  
       // pop();
    }
}


class Tile {
    static get SIZE() { return 32; }
    //INITIALIZE TILES
    static initialize(){
        Tile.tiles = new AirTile(0);
        Tile.tiles = new BlockTile(1);
        Tile.tiles = new BlockTile(2);
        Tile.tiles = new BlockTile(3);

        
    }
    static  getTileByID(index){
        return this._tiles[index];
    }

    static set tiles(value){
        if(!this._tiles){
            this._tiles = [];
        }
        this._tiles[value.index] = value;
    }

    constructor(index) {
        this.index = index;
        Tile.tiles = this;
    }
   
    render(x,y){

    }
}

class AirTile extends Tile {
    constructor(index) {
        super(index);
    }
    render(x,y){

    }
  
}

class BlockTile extends Tile {
    constructor(index) {
        super(index);
    }
    render(x,y){
     push();
    // fill(0,0,255);
     //noStroke();
     translate(x,y);
     image(Assets.Tile[this.index-1],0,0);
    // rect(0,0,Tile.SIZE,Tile.SIZE);
     pop();
    }
}



class Bomb extends Entity {
    static get size() { return 16; }
    
    constructor(ownerEntity) {
        super(ownerEntity.x, ownerEntity.y, Bomb.size, Bomb.size);
        this.owner = ownerEntity;
        this.tx = floor(this.owner.x) + 0.5;
        this.ty = floor(this.owner.y) + 0.5;
        this.timer = 100;
    }
    render() {
        push();
        translate(this.tx*Tile.SIZE,this.ty *Tile.SIZE);
        fill(255, 0, 0);
        ellipse(0, 0, this.w, this.h);
        pop();
    }

    addListener(callback){
        this.listener = callback;
    }

    explode(){
        let r = 3
        let tx = floor(this.x);
        let ty = floor(this.y);
        let canGoRight = true;
        console.log("position: " + tx + "," + ty);
        let rc = 0;
        let lc = 0;
        let dc = 0;
        let canGoLeft = true;
        let canGoDown = true;
        this.owner.currentBombs--;
        while(canGoRight || canGoLeft || canGoDown){
            if(canGoRight){
                rc++;
               var id =  Map.getTileByPos(tx + rc,ty);
               console.log(id);
               if(id === 1){
                   canGoRight = false;
                   Map.tiles[ty][tx + rc] = 0;
                   continue;
               }else{
                  if(id !== 0){
                    canGoRight = false;
                    continue;
                  }
               }
               if(rc === r) canGoRight = false;
            }
            
            if(canGoLeft){
                lc--;
               var id =  Map.getTileByPos(tx + lc,ty);
            
               if(id === 1){
                canGoLeft = false;
                   Map.tiles[ty][tx + lc] = 0;
                   continue;
               }else{
                  if(id !== 0){
                    canGoLeft = false;
                    continue;
                  }
               }
               if(abs(lc) === r) canGoLeft = false;
            }

            if(canGoDown){
                dc++;
               var id =  Map.getTileByPos(tx,ty + dc);
            
               if(id === 1){
                canGoDown = false;
                   Map.tiles[ty + dc][tx] = 0;
                   continue;
               }else{
                  if(id !== 0){
                    canGoDown = false;
                    continue;
                  }
               }
               if(dc === r) canGoDown = false;
            }

        }
    }

    update(){
        this.timer--;
        if(this.timer <= 0){
            if(this.exploded) return;
            this.explode();
            this.listener();
            this.exploded = true;   
        }
    }
}

class NetworkManager {

	constructor() {
		this.socket = io();
	}

	addEventListener(eventName, func) {
		if (func !== undefined)
			this.socket.on(eventName, func);
		else
			this.socket.on(eventName);
	}

	removeListener(eventName) {
		this.socket.off(eventName);
	}

	static get Instance() {
		if (!this._intance) {
			this._intance = new NetworkManager();
		}
		return this._intance;
	}

}

//MY ENUM
class Keys{
	static get LEFT() {return 65;}
	static get RIGHT() {return 68;}
	static get UP() {return 87;}
	static get DOWN() {return 83;}
	
}

class InputManager {

	
	constructor() {
		this.moving = {RIGHT:false,LEFT:false,UP:false,DOWN:false};
		//Copy 
		this.lastMove = Object.assign({}, this.moving);
		let keyHandler =  (e) => {
			e = e || window.event;
			if (e.keyCode == Keys.LEFT) {
				this.moving.LEFT = (e.type == "keydown");
			} else if (e.keyCode == Keys.RIGHT) {
				this.moving.RIGHT = (e.type == "keydown");
			}else if (e.keyCode == Keys.UP) {
				this.moving.UP = (e.type == "keydown");
			}else if (e.keyCode == Keys.DOWN) {
				this.moving.DOWN = (e.type == "keydown");
			}
			
			if(JSON.stringify(this.moving) !== JSON.stringify(this.lastMove)){ 
			this.lastMove = Object.assign({}, this.moving);
			//console.log(this.lastMove);
			NetworkManager.Instance.socket.emit("move",this.lastMove);
			}
			//NetworkManager.Instance.socket.emit("move",input);
			//this.lastMove = this.moving;
		}
		document.body.onkeydown = keyHandler;
		document.body.onkeyup = keyHandler;
		
	}
	
	
	


	static get Instance() {
		if (!this._intance) {
			this._intance = new InputManager();
		}
		return this._intance;
	}

}


let lastTime;
let stage = Stage.getInstance();
var inputManager;
function setup() {
    createCanvas(480, 480);
    Tile.initialize();
    lastTime = millis();
    Assets.initialize();
   inputManager =  InputManager.Instance;
	NetworkManager.Instance.addEventListener("map_data",(data)=>{
		//console.log(data);
		Map.load(data);
	});
	
	NetworkManager.Instance.addEventListener("current_players",(data)=>{
		for(var i=0;i<data.length;i++)
			Stage.getInstance().addEntity(new Player(0,0));
	});
	
	NetworkManager.Instance.addEventListener("player_leave",(playerID)=>{
		console.log("leave");
		console.log(playerID);
		Stage.getInstance().removeEntity(playerID);
	});
	
	NetworkManager.Instance.addEventListener("player_join",(data)=>{
		console.log(data);
		let p = new Player(0,0);
		Stage.getInstance().addEntity(p);
	});
	NetworkManager.Instance.addEventListener("player_state",(data)=>{
		//console.log(data);
		for(var i=0;i<data.length;i++)
		Stage.getInstance().players[i].datafromCopy(data[i])
	});

    //Map.load(TileMaps.map1);
    //stage.addEntity(new Player(32/Tile.SIZE,32/Tile.SIZE));
}


function draw() {
    stage.handleKeys();
    stage.render();
    let dt = millis() - lastTime;
    stage.update(dt);
    lastTime = millis();
    //stage.camera.move(0.05,0);
}

