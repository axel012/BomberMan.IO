let tank;
let managerSounds;
let tanksp;
let cnv;
let camera;

function preload() {
    Assets.initialize();
    Assets.registerAsset("sound1", createAudio("../sounds/sound1.mp3"));
    Assets.registerAsset("sound2", createAudio("../sounds/sound2.mp3"));
    Assets.registerAsset("sound3", createAudio("../sounds/sound3.mp3"));
    Assets.registerAsset("sound4", createAudio("../sounds/sound4.mp3"));
    Assets.registerAsset("sound5", createAudio("../sounds/sound5.mp3"));
    Assets.registerAsset("sound6", createAudio("../sounds/sound6.mp3"));
    Assets.registerAsset("redtank", loadImage("redtank.png"));
    Assets.registerAsset("map", loadJSON("./maps/mapa1.json"));
    Assets.registerAsset("tileset", loadImage("./maps/tileset.png"));
    Assets.registerAsset("bgTiles", loadImage("../maps/bgTiles.png"));
    Assets.registerAsset("blockTiles", loadImage("../maps/blockTiles.png"));
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
    managerSounds.registerSounds(Assets.get("sound1"));
    managerSounds.registerSounds(Assets.get("sound2"));
    managerSounds.registerSounds(Assets.get("sound3"));
    managerSounds.registerSounds(Assets.get("sound4"));
    managerSounds.registerSounds(Assets.get("sound5"));
    managerSounds.registerSounds(Assets.get("sound6"));
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
            var dr = 0;
            if (keyIsDown(LEFT_ARROW)) {
                dr -= this.rotationSpeed
            }
            if (keyIsDown(RIGHT_ARROW)) {
                dr += this.rotationSpeed;
            }
            this.rSpeed = dr;
        } else if (keyIsDown(UP_ARROW)) {
            this.xMove += this.linearSpeed * cos(this.rotation);
            this.yMove += this.linearSpeed * sin(this.rotation);
        }
        if (keyIsDown(DOWN_ARROW) && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
            var dr = 0;
            if (keyIsDown(LEFT_ARROW)) {
                dr += this.rotationSpeed
            }
            if (keyIsDown(RIGHT_ARROW)) {
                dr -= this.rotationSpeed;
            }
            this.rSpeed = dr;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.xMove += -this.linearSpeed * cos(this.rotation);
            this.yMove += -this.linearSpeed * sin(this.rotation);
        }
    }

    update() {
        this.rotation += this.rSpeed;
        let xEvaluated=this.x+this.xMove+this.w*Math.sign(this.xMove)/2;
        let yEvaluated=this.y+this.yMove+this.w*Math.sign(this.yMove)/2;
        if(Map.isThereACollidable(xEvaluated,yEvaluated)){
            this.x += this.xMove;
            this.y += this.yMove;
        }

        camera.followEntity(this);
    }

    display() {
        push();
        translate(this.x, this.y);
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        rect(-this.w / 2, -this.w / 2, this.w, this.w);
        rotate(this.rotation);
        image(this.img, -this.w / 2, -this.w / 2);
        stroke(0, 0, 255);
        pop();
        strokeWeight(2);
        stroke(255);
        noFill();
    }
}