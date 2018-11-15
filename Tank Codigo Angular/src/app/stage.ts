import { SoundManager } from "./sound-manager";
import { Assets } from "./assets";
import { Tank } from "./tank";
import { Camera } from "./camera";
import { Map } from "./map";


export class Stage {
    static _instance:Stage;
    
    static get Instance() {
      if (this._instance === undefined) {
          this._instance = new Stage();
      }
      return this._instance;
  }
    constructor() { 
    }
   
    private entities = [];
    private _player;
    private deadEntities = [];
    camera:Camera;

    public get mainPlayer(){
      return this._player;
    }
  
    addEntity(e){
      this.entities.push(e);
    }

    destroyEntity(e){
        this.deadEntities.push(e);
    }
  
    initialize(ctx){
      ctx.createCanvas(800,600);
  
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
      Map.load(Assets.get("map"),ctx);
    
     this._player = new Tank(50,50);

     Map.onResize(ctx);
   
    }
  
    preload(ctx){
      const loadSound = ctx.loadSound;
      const loadImage = ctx.loadImage;
      const loadJSON = ctx.loadJSON;
      
      Assets.registerAsset("shot", loadSound("../assets/sounds/shot.mp3"));
      Assets.registerAsset("movetank", loadSound("../assets/sounds/movetank.mp3"));
      Assets.registerAsset("engine", loadSound("../assets/sounds/engine.mp3"));
      Assets.registerAsset("sound1", loadSound("../assets/sounds/sound1.mp3"));
      Assets.registerAsset("sound2", loadSound("../assets/sounds/sound2.mp3"));
      Assets.registerAsset("sound3", loadSound("../assets/sounds/sound3.mp3"));
      Assets.registerAsset("sound4", loadSound("../assets/sounds/sound4.mp3"));
      Assets.registerAsset("sound5", loadSound("../assets/sounds/sound5.mp3"));
      Assets.registerAsset("sound6", loadSound("../assets/sounds/sound6.mp3"));
      Assets.registerAsset("redtank", loadImage("../assets/redtank.png"));
      Assets.registerAsset("map", loadJSON("../assets/maps/mapa1.json"));
      Assets.registerAsset("tileset", loadImage("../assets/maps/tileset.png"));
      Assets.registerAsset("bgTiles", loadImage("../assets/maps/bgTiles.png"));
      Assets.registerAsset("blockTiles", loadImage("../assets/maps/blockTiles.png"));
      
    }
  
    render(ctx){
      ctx.background(0);
      Map.render(this.camera,ctx);
      if(this._player)
      {
        this._player.handleKeys(ctx);
        this._player.update();
        this._player.render(ctx);
      }

      if(this.deadEntities.length > 0){
      this.entities = this.entities.filter((val)=>{
        return (this.deadEntities.indexOf(val) == -1 ? true : false)
      });
      this.deadEntities = [];
    }

      for(let e of this.entities){
        e.update(ctx);  
        e.render(ctx);
      }
     
    }
  
}
