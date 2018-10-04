class SoundManager{

constructor(){
    this.sounds=[];
    this.currentSound=0;
    this.lastSound = this.currentSound;
    
}

registerSounds(sound){
    this.sounds.push(sound);
}

next(){
    this.lastSound = this.currentSound;
    this.currentSound++;
    this.currentSound%=this.sounds.length;

    this.sounds[this.lastSound].stop();
    this.playSounds();
}

playSounds(){
    this.sounds[this.currentSound].play();
    this.sounds[this.currentSound].onended(()=>{this.next()});
}

}