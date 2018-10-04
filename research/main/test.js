var tank;
var managerSounds;
var tanksp;

function preload(){
    Assets.initialize();
    Assets.registerAsset("sound1",createAudio("../sounds/sound1.mp3"));
    Assets.registerAsset("sound2",createAudio("../sounds/sound2.mp3"));
    Assets.registerAsset("sound3",createAudio("../sounds/sound3.mp3"));
    Assets.registerAsset("redtank",loadImage("redtank.png"));
   
    
    
}
function setup(){
    createCanvas(windowWidth*.8,windowHeight*.8);
    tanksp = Assets.get("redtank");
    var img = tanksp.get(0,32*3,32,32);
    tank = new Tank(img,width/2,height/2);
    managerSounds=new SoundManager();
    managerSounds.registerSounds(Assets.get("sound1"));
    managerSounds.registerSounds(Assets.get("sound2"));
    managerSounds.registerSounds(Assets.get("sound3"));
    managerSounds.playSounds();
}

function draw(){
    background(0);
    tank.handleKeys();
    tank.update();
    tank.display();
    noStroke();
    fill(255);
    text(frameRate(),50,50);
    //fill(255);
    //for(var i=1;i<8;i+=2)
   // ellipse(tank.x  + tank.w * cos(tank.rotation + i*PI/4) -7  * cos(tank.rotation + i*PI/4) ,tank.y  + tank.w * sin(tank.rotation + i*PI/4) -7 * sin(tank.rotation + i*PI/4),14,14);
  //  ellipse(tank.x  + tank.w * cos(tank.rotation + 3*PI/4) -7  * cos(tank.rotation + 3*PI/4) ,tank.y  + tank.w * sin(tank.rotation + 3*PI/4) -7  * sin(tank.rotation + 3*PI/4),14,14);
   // ellipse(tank.x  + tank.w * cos(tank.rotation + 5*PI/4) -7  * cos(tank.rotation + 5*PI/4) ,tank.y  + tank.w * sin(tank.rotation + 5*PI/4) -7  * sin(tank.rotation + 5*PI/4),14,14);
}


class Tank{
    constructor(img,x,y){
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
    handleKeys(){
        this.rSpeed = 0;
        this.xMove = 0;
        this.yMove = 0;
        if(keyIsDown(UP_ARROW) && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))){
            var dr = 0;
            if(keyIsDown(LEFT_ARROW)){
                dr -= this.rotationSpeed
            }
            if(keyIsDown(RIGHT_ARROW)){
                dr += this.rotationSpeed;
            }
            this.rSpeed = dr;
        }else if(keyIsDown(UP_ARROW)){
            this.xMove += this.linearSpeed * cos(this.rotation);
            this.yMove += this.linearSpeed * sin(this.rotation);
        }
        if(keyIsDown(DOWN_ARROW)  && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))){
            var dr = 0;
            if(keyIsDown(LEFT_ARROW)){
                dr += this.rotationSpeed
            }
            if(keyIsDown(RIGHT_ARROW)){
                dr -= this.rotationSpeed;
            }
            this.rSpeed = dr;
        }else if(keyIsDown(DOWN_ARROW)){
            this.xMove += -this.linearSpeed * cos(this.rotation);
            this.yMove += -this.linearSpeed * sin(this.rotation);
        }
    }

    update(){
        this.rotation += this.rSpeed;
        this.x += this.xMove;
        this.y += this.yMove;
        var dx = width - this.x;
        var dx2 = 0 - this.x;
        var dy = height - this.y;
        var dy2 = 0 - this.y;
        var r = this.w/2;
   
        if(dx*dx <= r*r){
            this.x = width - r;
        }else if(dx2*dx2 <= r*r){
            this.x = r;
        }
        if(dy*dy <= r*r){
            this.y = height - r;
        }else if(dy2*dy2 <= r*r){
            this.y = r;
        }
    }

    display(){
        push();
        translate(this.x,this.y);
        noFill();
        stroke(0,255,0);
        strokeWeight(2);
//        rect(-this.w/2,-this.w/2,this.w,this.w);
        rotate(this.rotation);
        image(this.img,-this.w/2,-this.w/2);
       stroke(0,0,255);
      //  fill(255);
  //      rect(-this.w/2,-this.w/2,this.w,this.w);
        
        //fill(255,0,0);
        //ellipse(this.w/2,0,15,15);
     
        pop();
        strokeWeight(2);
        stroke(255);
      //  line(this.x,this.y,this.x , this.y + 50 * sin(this.rotation));
    //    line(this.x,this.y,this.x + 50 * cos(this.rotation) , this.y);
       // line(this.x,this.y,this.x + 50 * cos(this.rotation),this.y + 50 * sin(this.rotation));
        noFill();
        ellipse(this.x,this.y,this.w,this.w);
    }
}