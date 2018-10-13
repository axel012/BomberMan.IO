var img;
var tank;
var skin;
function preload(){
img = loadImage("redtank.png");
}

function calcData(r,g,b){
var rt = r/255;
var gt = g/255;
var bt = b/255;
var _max = max([rt,gt,bt]);
var _min = min([rt,gt,bt]);
var dt = _max - _min;
var light = (_max + _min) / 2;
var sat = dt == 0 ? 0 : dt/(1-abs(2*light - 1));
var _hue;
if(rt === _max){
_hue = (gt - bt)/(_max - _min);
}else if(gt === _max){
_hue = 2 + (bt - rt)/(_max - _min);
}else if(bt === _max){
_hue = 4 + (rt - gt)/(_max - _min);
}
_hue *= 60;
_hue = _hue < 0 ? _hue + 360 : _hue;
return [_hue,sat*100,light*100];
}

var pick;
function setup(){
createCanvas(400,400);
tank = img.get(0,0,32,32);
skin = createGraphics(32,32);
colorMode(HSL);
//updateSkin(240)
pick = new ColorPicker(0,0,0);


  //var val = slider.value();

skin.image(tank,0,0);
}

class ColorPicker{
	
	constructor(r,g,b){
		this.red = r;
		this.green = g;
		this.blue = b;
	}
	
	render(){
		push();
		translate(50,50);
		fill(0,0,0);
		rect(0,0,100,100);
		fill(0,100,100);
		textSize(32);
		textAlign(CENTER,CENTER);
		text(this.red,0,0,110,32);
		text(this.green,0,32,110,32);
		text(this.blue,0,64,110,32);
		triangle(8, 16, 16, 8, 16, 24);
		pop();
		
	}
	
}

function updateSkin(targetHue1,targetHue2){
tank.loadPixels();
//skin.loadPixels();
for(var y=0;y<32;y++){
for(var x=0;x<32;x++){
	var index =  (x + y * 32)*4;
	
	if(tank.pixels[index + 3] === 0) continue;
	var data = calcData(tank.pixels[index],tank.pixels[index+1],tank.pixels[index+2]);
	if(data[0] < 60 || data[0] > 350){
		if(data[0] < 60)
			var tc = color(targetHue1,data[1],data[2]);
		else
			var tc = color(targetHue2,data[1],data[2]);

	skin.set(x,y,tc);
}

}
}
skin.updatePixels();
}

function draw(){
background(0,100,50);
image(skin,0,0);
pick.render();
}