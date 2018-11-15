export class SoundManager {
    private static _instance:SoundManager;

    static get Instance() {
      if(SoundManager._instance === undefined){
        SoundManager._instance = new SoundManager();
      }
      return SoundManager._instance;
   }
  
    private soundsMusica = {};
    private soundsEffects = {};
    private intervals = {};
    private currentSound = 0;
    private lastSound = this.currentSound;
    private key:any;
  
    constructor() {
      this.soundsMusica = {};
      this.soundsEffects = {};
      this.intervals = {};
      this.currentSound = 0;
      this.lastSound = this.currentSound;
      this.key = function (n) {
          return this.soundsMusica[Object.keys(this.soundsMusica)[n]];
      }
  }
  
  registerSounds(nameSound, sound, type) {
      if (type === "music") {
          this.soundsMusica[nameSound] = sound;
      }
      else {
          this.soundsEffects[nameSound] = sound;
      }
  }
  
  next() {
      this.lastSound = this.currentSound;
      this.currentSound++;
      this.currentSound %= Object.keys(this.soundsMusica).length;
  
      this.key(this.lastSound).stop();
      this.playSounds();
  }
  
  playSound(thesound, loop) {
     
      let sound=this.soundsEffects[thesound];
      if (!sound.isPlaying()) {
          
          if (loop) {
            /*  if(this.intervals[thesound]){
  
                  clearInterval(this.intervals[thesound]);
              }
              this.intervals[thesound] = setInterval(function () { sound.jump(); }, sound.duration() * 1000 -300);
              */
             sound.loop();
          }else{
            sound.play();
          }
      }
  
  }
  
  stopSound(thesound) {
      clearInterval(this.intervals[thesound]);
      this.soundsEffects[thesound].stop();
  }
  
  playSounds() {
      this.key(this.currentSound).play();
      this.key(this.currentSound).onended(() => { this.next() });
  
  }
  
  public static TYPESOUND = {
    EFFECT: "effect",
    MUSIC: "music"
    }
}
