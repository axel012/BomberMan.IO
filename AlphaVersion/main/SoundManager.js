
 class SoundManager {


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
    static get Instance() {
       if(this._instance === undefined){
           this._instance = new SoundManager();
       }
       return this._instance;
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
        /* this.sounds[this.lastSound].stop();*/
        this.playSounds();
    }

    playSound(thesound, loop) {
       
        let sound=this.soundsEffects[thesound];
        if (!sound.isPlaying()) {
            sound.play();
            if (loop) {
                if(this.intervals[thesound]){

                    clearInterval(this.intervals[thesound]);
                }
                this.intervals[thesound] = setInterval(function () { sound.play(); }, sound.duration() * 1000 -300);
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
        /*this.sounds[this.currentSound].play();
        this.sounds[this.currentSound].onended(()=>{this.next()});*/
    }

}

SoundManager.instance=undefined;
SoundManager.TYPESOUND = {
EFFECT: "effect",
MUSIC: "music"
}