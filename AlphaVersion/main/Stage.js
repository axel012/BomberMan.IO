class Stage {

    constructor() {
        this.players = [];
        this.bullets = [];
        this.entities = [];
        this.cnv = {};
    }

    static get Instance() {
        if (this._instance === undefined) {
            this._instance = new Stage();
        }
        return this._instance;
    }

    addEntity(e) {
        this.entities.push(e);
        if (e instanceof Bullet) {
            this.bullets.push(e);
        } else if (e instanceof Tank) {
            this.players.push(e);
        }
    }

    addMainPlayer(p) {
        this.mainPlayer = p;
        this.entities.push(p);
    }

    preloadAssets() {
        Assets.initialize();
        Assets.registerAsset("shot", loadSound("sounds/shot.mp3"));
        Assets.registerAsset("movetank", loadSound("sounds/movetank.mp3"));
        Assets.registerAsset("engine", loadSound("sounds/engine.mp3"));
        Assets.registerAsset("sound1", loadSound("sounds/sound1.mp3"));
        Assets.registerAsset("sound2", loadSound("sounds/sound2.mp3"));
        Assets.registerAsset("sound3", loadSound("sounds/sound3.mp3"));
        Assets.registerAsset("sound4", loadSound("sounds/sound4.mp3"));
        Assets.registerAsset("sound5", loadSound("sounds/sound5.mp3"));
        Assets.registerAsset("sound6", loadSound("sounds/sound6.mp3"));
        Assets.registerAsset("redtank", loadImage("redtank.png"));
        Assets.registerAsset("map", loadJSON("maps/mapa1.json"));
        Assets.registerAsset("tileset", loadImage("maps/tileset.png"));
        Assets.registerAsset("bgTiles", loadImage("maps/bgTiles.png"));
        Assets.registerAsset("blockTiles", loadImage("maps/blockTiles.png"));
    }

    initialize() {
        this.cnv = createCanvas(displayWidth, displayHeight);
        /* let x = (windowWidth - width) / 2;
         let y =(windowHeight-height)/2;*/
        this.cnv.position(0, 0);
        width = windowWidth;
        height = windowHeight;
        // tank = new Tank(width / 2, height / 2);

        SoundManager.Instance.registerSounds("sound1", Assets.get("sound1"), SoundManager.TYPESOUND.MUSIC);
        SoundManager.Instance.registerSounds("sound2", Assets.get("sound2"), SoundManager.TYPESOUND.MUSIC);
        SoundManager.Instance.registerSounds("sound3", Assets.get("sound3"), SoundManager.TYPESOUND.MUSIC);
        SoundManager.Instance.registerSounds("sound4", Assets.get("sound4"), SoundManager.TYPESOUND.MUSIC);
        SoundManager.Instance.registerSounds("sound5", Assets.get("sound5"), SoundManager.TYPESOUND.MUSIC);
        SoundManager.Instance.registerSounds("sound6", Assets.get("sound6"), SoundManager.TYPESOUND.MUSIC);
        SoundManager.Instance.registerSounds("engine", Assets.get("engine"), SoundManager.TYPESOUND.EFFECT);
        SoundManager.Instance.registerSounds("movetank", Assets.get("movetank"), SoundManager.TYPESOUND.EFFECT);
        SoundManager.Instance.registerSounds("shot", Assets.get("shot"), SoundManager.TYPESOUND.EFFECT);
        SoundManager.Instance.playSound("engine", true);


        this.camera = new Camera(Assets.get("map").width, Assets.get("map").height);
        Map.load(Assets.get("map"));
        this.addMainPlayer(new Tank(17 * Tile.SIZE, 10 * Tile.SIZE));


        Map.onResize();

    }

    handleKeysReleased(){
        this.mainPlayer.handleKeysReleased();
    }

    render() {
        background(0);
        push();
        Map.render(this.camera);
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i] === this.mainPlayer) continue;
            this.players[i].render();
        }
        //render mainPlayer on top of other players
        this.mainPlayer.render();

        //render bullets on top
        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].render();
        }
        fill(255);
        noStroke();
        textSize(18);
        text(floor(frameRate()), 60, 60);
        pop();

    }

    update(dt) {
        this.mainPlayer.handleKeys();
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(dt);
        }
    }

}