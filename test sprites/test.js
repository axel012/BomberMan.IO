var spriteSheet;
var first;
var ratio;
var cw,ch;
var animation;
var currentAnim;
var lastTime;
var y = 0;
var x = 0;
var speed = 0.05;
function preload(){
	spriteSheet = loadImage("sprite.png");
}

function setup(){
	w = 120;
	h = 130;
	ratio = h/w;
	cw = 32;
	ch = cw * ratio;
	createCanvas(400,400);
	first = spriteSheet.get(0,0,w,h);
	animation = new Animation(spriteSheet,w,h);
	animation.registerAnim("walkdown",4,10,750);
	animation.registerAnim("walkleft",5,10,750);
	animation.registerAnim("walkup",6,10,750);
	animation.registerAnim("walkright",7,10,750);
	currentAnim = "walkdown";
	lastTime = millis();
}

function draw(){
	var dt = millis() - lastTime;
	lastTime = millis();
	
	background(0);
	//image(first,0,0,cw,ch);
	animation.update(currentAnim,dt);
	animation.renderAnim(currentAnim,x,y,96,96);
	if(currentAnim == "walkdown"){
		y += speed * dt;
	}else if(currentAnim == "walkright"){
		x += speed * dt;
	}else if(currentAnim == "walkup"){
		y -= speed * dt;
	}else if(currentAnim == "walkleft"){
		x-=speed
	}
	
	if(y + 96 > height || y < 0){
		if(random(1) < 0.5){
			currentAnim = x < width/2 ? "walkright" : "walkleft";
		}else{
			currentAnim = "walkup";
		}
	    y = y < 0 ? 0 : height - 96; 
	}else if(x + 96 > width || x < 0){
		if(random(1) < 0.5){
			currentAnim = "walkleft"
		}else{
			currentAnim = y > height/2 ? "walkup" : "walkdown";
		}
		x = x < 0 ? 0 : width-96;
	}
}

class Animation{
	constructor(sheet,w,h){
		this.sheet = sheet;
		this.w = w;
		this.h = h;
		this.aspectRatio = h/w;
		this.anims = {};
	}
	registerAnim(name,row,Nframes,totalTime){
		this.anims[name] = {};
		this.anims[name].frames = [];
		this.anims[name].currentTime = 0;
		this.anims[name].frameCount = Nframes;
		for(var i=0;i<Nframes;i++){
			this.anims[name].frames.push(this.sheet.get(i*this.w,row*this.h,this.w,this.h));
		}
		this.anims[name].dt = totalTime/this.anims[name].frameCount;
		this.anims[name].currentframeIndex = 0;
	}
	
	renderAnim(name,x,y,w,h){
		if(this.anims[name]){
			image(this.anims[name].frames[this.anims[name].currentframeIndex],x,y,w,h*this.aspectRatio);
		}
	}
	update(name,dt){
		var anim = this.anims[name];
		anim.currentTime += dt;
		if(anim.currentTime > anim.dt){
			anim.currentTime = 0;
			anim.currentframeIndex++;
			if(anim.currentframeIndex >= 10){
				anim.currentframeIndex = 0;
			}
		}
	}
}