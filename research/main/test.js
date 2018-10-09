let tank;
let managerSounds;
let tanksp;
let cnv;
let camera;

function preload() {
    Assets.initialize();

    Assets.registerAsset("movetank", loadSound("./sounds/movetank.mp3"));
    Assets.registerAsset("engine", loadSound("./sounds/engine.mp3"));
    Assets.registerAsset("sound1", loadSound("./sounds/sound1.mp3"));
    Assets.registerAsset("sound2", loadSound("./sounds/sound2.mp3"));
    Assets.registerAsset("sound3", loadSound("./sounds/sound3.mp3"));
    Assets.registerAsset("sound4", loadSound("./sounds/sound4.mp3"));
    Assets.registerAsset("sound5", loadSound("./sounds/sound5.mp3"));
    Assets.registerAsset("sound6", loadSound("./sounds/sound6.mp3"));
    Assets.registerAsset("redtank", loadImage("redtank.png"));
    Assets.registerAsset("map", loadJSON("./maps/mapa1.json"));
    Assets.registerAsset("tileset", loadImage("./maps/tileset.png"));
    Assets.registerAsset("bgTiles", loadImage("./maps/bgTiles.png"));
    Assets.registerAsset("blockTiles", loadImage("./maps/blockTiles.png"));
}

function setup() {
    cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.9);
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
    tanksp = Assets.get("redtank");
    let img = tanksp.get(0, 32 * 3, 32, 32);
    tank = new Tank(img, width / 2, height / 2);
    managerSounds = new SoundManager();
    managerSounds.registerSounds("sound1",Assets.get("sound1"));
    managerSounds.registerSounds("sound2",Assets.get("sound2"));
    managerSounds.registerSounds("sound3",Assets.get("sound3"));
    managerSounds.registerSounds("sound4",Assets.get("sound4"));
    managerSounds.registerSounds("sound5",Assets.get("sound5"));
    managerSounds.registerSounds("sound6",Assets.get("sound6"));
    managerSounds.registerSounds("engine",Assets.get("engine"));
    managerSounds.registerSounds("movetank",Assets.get("movetank"));

    managerSounds.playSound("engine",true);
    managerSounds.playSounds();
  /*  loadTiles();*/
    camera = new Camera(Assets.get("map").width, Assets.get("map").height);
    Map.load(Assets.get("map"));

}

/*function loadTiles() {
    let tilesprite = Assets.get("tileset");
    const nonwalkableTiles = [6, 8, 9, 10, 21, 23, 24, 25, 36, 37, 38, 39, 40, 47, 48, 55, 56, 57, 58, 59];
    const biggerThan = 61;
    let index = 0;
    for (let y = 0; y < tilesprite.height; y += Tile.SIZE) {
        for (let x = 0; x < tilesprite.width; x += Tile.SIZE) {
            let walkable = true;
            if (nonwalkableTiles.indexOf(index) !== -1) {
                walkable = false;
            }
            TileManager.registerTile(tilesprite.get(x, y, Tile.SIZE, Tile.SIZE), walkable);
            index++;
        }
    }
}*/

function draw() {
    background(0);

    Map.render(camera);
    // Map.render();
    tank.handleKeys();
    tank.update();
    tank.display();
    noStroke();
    fill(255);
    text(frameRate(), 50, 50);
}


class Tank {
    constructor(img, x, y) {
        this.x = x;
        this.img = img;
        this.y = y;
        this.w = this.img.width;
        this.h=this.img.height;
        this.linearSpeed = 2;
        this.rotationSpeed = 0.05;
        this.rotation = 0;
        this.rSpeed = 0;
        this.xMove = 0;
        this.yMove = 0;
    }

    handleKeys() {
        this.rSpeed = 0;
        this.xMove = 0;
        this.yMove = 0;
        if (keyIsDown(UP_ARROW) && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
            let dr = 0;
            if (keyIsDown(LEFT_ARROW)) {
                dr -= this.rotationSpeed
            }
            if (keyIsDown(RIGHT_ARROW)) {
                dr += this.rotationSpeed;
            }
            this.rSpeed = dr;
        }
        if (keyIsDown(UP_ARROW)) {
            this.xMove += this.linearSpeed * cos(this.rotation);
            this.yMove += this.linearSpeed * sin(this.rotation);
        }
        if (keyIsDown(DOWN_ARROW) && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
            let dr = 0;
            if (keyIsDown(LEFT_ARROW)) {
                dr += this.rotationSpeed
            }
            if (keyIsDown(RIGHT_ARROW)) {
                dr -= this.rotationSpeed;
            }
            this.rSpeed = dr;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.xMove += -this.linearSpeed * cos(this.rotation);
            this.yMove += -this.linearSpeed * sin(this.rotation);
        }
    }

    update() {
        this.rotation += this.rSpeed;
        let xEvaluated=this.x+this.xMove;
        let yEvaluated=this.y+this.yMove;
        let colli=Map.getThereACollidable(xEvaluated,yEvaluated,this.w+5,this.h+5);
        if(colli===null){
            this.x += this.xMove;
            this.y += this.yMove;
        }
        else{
            /*this.rSpeed += this.rotationSpeed*(-1)+0.3*Math.sign(this.rotationSpeed);*/
            /*puntos medios  cuadrado tanque*/
             xEvaluated=this.x+this.xMove;
             yEvaluated=this.y;
             colli=Map.getThereACollidable(xEvaluated,yEvaluated,this.w+5,this.h+5);
            if(colli===null){
                this.x += this.xMove;
            }else{
                xEvaluated=this.x;
                yEvaluated=this.y+this.yMove;
                colli=Map.getThereACollidable(xEvaluated,yEvaluated,this.w+5,this.h+5);
                if(colli===null){
                    this.y += this.yMove;
                }
            }
            /*let tm={x:this.x,y:this.y-this.h/2};
            let lm={x:this.x-this.w/2,y:this.y};
            let rm={x:this.x+this.w/2,y:this.y};
            let bm={x:this.x,y:this.y+this.h/2};
            /!*distancias al bloque *!/
            let dtm=Math.sqrt(Math.pow(tm.x-colli.x,2)+Math.pow(tm.y-colli.y,2));
            let dlm=Math.sqrt(Math.pow(lm.x-colli.x,2)+Math.pow(lm.y-colli.y,2));
            let drm=Math.sqrt(Math.pow(rm.x-colli.x,2)+Math.pow(rm.y-colli.y,2));
            let dbm=Math.sqrt(Math.pow(bm.x-colli.x,2)+Math.pow(bm.y-colli.y,2));

            let distb=min(dtm,dbm);
            let dislr=min(dlm,drm);
            console.log(dislr+" "+distb);
            this.rSpeed += 0.02;
            this.rotation+=this.rSpeed*(this.xMove*this.yMove)*(distb>dislr?-1:1);*/
        }

        camera.followEntity(this);
    }

    display() {
        push();
        translate(this.x, this.y);
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        rotate(this.rotation);
        image(this.img, -this.w / 2, -this.w / 2);
        rect(-this.w / 4, -this.w / 4, this.w/2, this.w/2);
        stroke(0, 0, 255);
        pop();
        strokeWeight(8);
        stroke(255);
        point(this.x-this.w/2,this.y-this.w/2);
        point(this.x+this.w/2,this.y-this.w/2);
        point(this.x-this.w/2,this.y+this.w/2);
        point(this.x+this.w/2,this.y+this.w/2);
        noFill();
    }
}