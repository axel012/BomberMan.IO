
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
    static getInstance() {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
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
        let sound = this.soundsEffects[thesound];
        if (!sound.isPlaying()) {
            sound.play();
            if (loop) {
                this.intervals[thesound] = setInterval(function () { sound.play(); }, sound.duration() * 1000 - 500);
            }
        }

    }

    stopSound(thesound) {
        this.soundsEffects[thesound].stop();
        clearInterval(this.intervals[thesound]);
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