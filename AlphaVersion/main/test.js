let tank;
let managerSounds;
let tanksp;
let cnv;
let camera;

function preload() {
  Stage.Instance.preloadAssets();
}

function setup() {
   Stage.Instance.initialize();

}


function draw() {
   Stage.Instance.update(0);
   Stage.Instance.render();
}

function keyReleased(){
   
   if(keyCode===UP_ARROW || keyCode===DOWN_ARROW){
   
  //  SoundManager.Instance.stopSound('movetank');
  //  SoundManager.Instance.playSound('engine',true);
   }
   return false;
}

class Tank {
    constructor(x, y) {
     
        this.img = Assets.get("redtank").get(0, 32 * 3, 32, 32);
       
        this.w = this.img.width;
        this.h=this.img.height;
        this.y = y + this.w / 2;
        this.x = x + this.h;
        this.linearSpeed = 2;
        this.rotationSpeed = 0.08;
        this.rotation = 0;
        this.rSpeed = 0;
        this.xMove = 0;
        this.yMove = 0;
    }

    handleKeys() {
        this.rSpeed = 0;
        this.xMove = 0;
        this.yMove = 0;
        if (keyIsDown(UP_ARROW) && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
            let dr = 0;
            if (keyIsDown(LEFT_ARROW)) {
                dr -= this.rotationSpeed
            }
            if (keyIsDown(RIGHT_ARROW)) {
                dr += this.rotationSpeed;
            }
            this.rSpeed = dr;
        }
        else if (keyIsDown(DOWN_ARROW) && (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
            let dr = 0;
            if (keyIsDown(LEFT_ARROW)) {
                dr += this.rotationSpeed
            }
            if (keyIsDown(RIGHT_ARROW)) {
                dr -= this.rotationSpeed;
            }
            this.rSpeed = dr;
        }else if(keyIsDown(DOWN_ARROW) || keyIsDown(UP_ARROW)){
            this.xMove += (keyIsDown(UP_ARROW)===true?1:(-1))*this.linearSpeed * cos(this.rotation);
            this.yMove += (keyIsDown(UP_ARROW)===true?1:(-1))*this.linearSpeed * sin(this.rotation);
       //     SoundManager.Instance.stopSound('engine');
        //    SoundManager.Instance.playSound('movetank',true);
            
        }
       

    }
    

    update() {
        this.rotation += this.rSpeed;
        let xEvaluated=this.x+this.xMove;
        let yEvaluated=this.y+this.yMove;
        let colli=Map.getThereACollidable(xEvaluated,yEvaluated,this.w+5,this.h+5);
        if(colli===null){
            this.x += this.xMove;
            this.y += this.yMove;
        }
        else{
            /*this.rSpeed += this.rotationSpeed*(-1)+0.3*Math.sign(this.rotationSpeed);*/
            /*puntos medios  cuadrado tanque*/
             xEvaluated=this.x+this.xMove;
             yEvaluated=this.y;
             colli=Map.getThereACollidable(xEvaluated,yEvaluated,this.w+5,this.h+5);
            if(colli===null){
                this.x += this.xMove;
            }else{
                xEvaluated=this.x;
                yEvaluated=this.y+this.yMove;
                colli=Map.getThereACollidable(xEvaluated,yEvaluated,this.w+5,this.h+5);
                if(colli===null){
                    this.y += this.yMove;
                }
            }
            /*let tm={x:this.x,y:this.y-this.h/2};
            let lm={x:this.x-this.w/2,y:this.y};
            let rm={x:this.x+this.w/2,y:this.y};
            let bm={x:this.x,y:this.y+this.h/2};
            /!*distancias al bloque *!/
            let dtm=Math.sqrt(Math.pow(tm.x-colli.x,2)+Math.pow(tm.y-colli.y,2));
            let dlm=Math.sqrt(Math.pow(lm.x-colli.x,2)+Math.pow(lm.y-colli.y,2));
            let drm=Math.sqrt(Math.pow(rm.x-colli.x,2)+Math.pow(rm.y-colli.y,2));
            let dbm=Math.sqrt(Math.pow(bm.x-colli.x,2)+Math.pow(bm.y-colli.y,2));

            let distb=min(dtm,dbm);
            let dislr=min(dlm,drm);
            console.log(dislr+" "+distb);
            this.rSpeed += 0.02;
            this.rotation+=this.rSpeed*(this.xMove*this.yMove)*(distb>dislr?-1:1);*/
        }

        Stage.Instance.camera.followEntity(this);
    }

    render() {
        push();
        translate(this.x, this.y);
        //translate(this.w/2,this.w/2);
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        rotate(this.rotation);
        image(this.img, -this.w / 2, -this.w / 2);
        // rect(-this.w / 4, -this.w / 4, this.w/2, this.w/2);
        stroke(0, 0, 255);
        pop();
        strokeWeight(8);
        stroke(255);
        point(this.x-this.w/2,this.y-this.w/2);
        point(this.x+this.w/2,this.y-this.w/2);
        point(this.x-this.w/2,this.y+this.w/2);
        point(this.x+this.w/2,this.y+this.w/2);
        noFill();
    }
}

function windowResized() {

	resizeCanvas(windowWidth*0.95, windowHeight*0.95);
    Map.onResize();
	
  }
  