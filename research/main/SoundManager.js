class SoundManager{

constructor(){
    this.sounds={};
    this.currentSound=0;
    this.lastSound = this.currentSound;
    this.key= function(n) {
        return this.sounds[Object.keys(this.sounds)[n]];
    }
}

registerSounds(nameSound,sound){
    this.sounds[nameSound]=sound;
}

next(){
    this.lastSound = this.currentSound;
    this.currentSound++;
    this.currentSound%=Object.keys(this.sounds).length;

    this.key(this.lastSound).stop();
   /* this.sounds[this.lastSound].stop();*/
    this.playSounds();
}

playSound(thesound,loop){
    let intervalID;
    let sound=this.sounds[thesound];
    if(!sound.isPlaying()){
        sound.play();
        if(loop){
            intervalID = setInterval(function(){ sound.play();},  sound.duration()*1000-500);
        }
    }

}



playSounds(){
    this.key(this.currentSound).play();
    this.key(this.currentSound).onended(()=>{this.next()});
    /*this.sounds[this.currentSound].play();
    this.sounds[this.currentSound].onended(()=>{this.next()});*/
}

}