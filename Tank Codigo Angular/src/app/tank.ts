import { Assets } from "./assets";
import { Bullet } from "./bullet";
import { Stage } from "./stage";
import { SoundManager } from "./sound-manager";
import { Map } from "./map";


export class Tank {

    img:any;
    w:number;
    h:number;
    y:number;
    x:number;
    linearSpeed:number;
    rotationSpeed:number;
    rotation:number;
    rSpeed:number;
    xMove:number;
    yMove:number;
    fireRateCounter:number;
    limitFireRate:number;


    constructor(x, y) {
       
        this.img = Assets.get("redtank").get(0, 32 * 3, 32, 32);
        
        this.w = 32*0.8;
        this.h = 32*0.8;
        this.y = y + this.w / 2;
        this.x = x + this.h/2;
        this.linearSpeed = 2;
        this.rotationSpeed = 0.08;
        this.rotation = 0;
        this.rSpeed = 0;
        this.xMove = 0;
        this.yMove = 0;
        this.fireRateCounter=11;
        this.limitFireRate=10;
    }

    handleKeys(ctx) {
        this.rSpeed = 0;
        this.xMove = 0;
        this.yMove = 0;
        if (ctx.keyIsDown(ctx.UP_ARROW) && (ctx.keyIsDown(ctx.LEFT_ARROW) || ctx.keyIsDown(ctx.RIGHT_ARROW))) {
            let dr = 0;
            if (ctx.keyIsDown(ctx.LEFT_ARROW)) {
                dr -= this.rotationSpeed
            }
            if (ctx.keyIsDown(ctx.RIGHT_ARROW)) {
                dr += this.rotationSpeed;
            }
            this.rSpeed = dr;
        }
        else if (ctx.keyIsDown(ctx.DOWN_ARROW) && (ctx.keyIsDown(ctx.LEFT_ARROW) || ctx.keyIsDown(ctx.RIGHT_ARROW))) {
            let dr = 0;
            if (ctx.keyIsDown(ctx.LEFT_ARROW)) {
                dr += this.rotationSpeed
            }
            if (ctx.keyIsDown(ctx.RIGHT_ARROW)) {
                dr -= this.rotationSpeed;
            }
            this.rSpeed = dr;
        } else if (ctx.keyIsDown(ctx.DOWN_ARROW) || ctx.keyIsDown(ctx.UP_ARROW)) {
            this.xMove += (ctx.keyIsDown(ctx.UP_ARROW) === true ? 1 : (-1)) * this.linearSpeed * Math.cos(this.rotation);
            this.yMove += (ctx.keyIsDown(ctx.UP_ARROW) === true ? 1 : (-1)) * this.linearSpeed * Math.sin(this.rotation);
            //this.soundManager.stopSound('engine');
           // this.soundManager.playSound('movetank',true);

        }
        //90 es la z
        if(ctx.keyIsDown(90)){
            if(this.fireRateCounter > this.limitFireRate){
		    this.fireRateCounter=0;
		    let xB=this.x + Math.cos(this.rotation) * this.w/2;
		    let yB=this.y + Math.sin(this.rotation) * this.h/2;
		   let bullet=new Bullet(null,xB,yB,40,this.rotation,100);
		    Stage.Instance.addEntity(bullet);
            SoundManager.Instance.stopSound('shot');
            SoundManager.Instance.playSound('shot',false);
            }else{
	            ++this.fireRateCounter;
            }
        }


    }
    handleKeysReleased(ctx){
        if (ctx.keyCode === ctx.UP_ARROW || ctx.keyCode === ctx.DOWN_ARROW) {
        SoundManager.Instance.stopSound('movetank');
        SoundManager.Instance.playSound('engine',true);
        }
        if(ctx.keyCode === 90){
            this.fireRateCounter=11;
        }
    }

    update() {
        this.rotation += this.rSpeed;
        let xEvaluated = this.x + this.xMove;
        let yEvaluated = this.y + this.yMove;
        let colli = Map.getThereACollidable(xEvaluated, yEvaluated, this.w + 5, this.h + 5);
        if (colli === null) {
            this.x += this.xMove;
            this.y += this.yMove;
        }
        else {
            this.rSpeed += this.rotationSpeed*(-1)+0.3*Math.sign(this.rotationSpeed);
            /*puntos medios  cuadrado tanque*/
            xEvaluated = this.x + this.xMove;
            yEvaluated = this.y;
            colli = Map.getThereACollidable(xEvaluated, yEvaluated, this.w + 5, this.h + 5);
            if (colli === null) {
                this.x += this.xMove;
            } else {
                xEvaluated = this.x;
                yEvaluated = this.y + this.yMove;
                colli = Map.getThereACollidable(xEvaluated, yEvaluated, this.w + 5, this.h + 5);
                if (colli === null) {
                    this.y += this.yMove;
                }
            }
        }


    }

    render(ctx) {
        ctx.push();
        ctx.translate(this.x, this.y);
        //translate(this.w/2,this.w/2);
        ctx.noFill();
        ctx.stroke(0, 255, 0);
        ctx.strokeWeight(2);
        ctx.rotate(this.rotation);
        ctx.image(this.img, -this.w / 2, -this.h / 2,this.w,this.h);
        // rect(-this.w / 4, -this.w / 4, this.w/2, this.w/2);
        ctx.stroke(0, 0, 255);
        ctx.pop();
        ctx.strokeWeight(8);
        ctx.stroke(255);
        ctx.point(this.x - this.w / 2, this.y - this.w / 2);
        ctx.point(this.x + this.w / 2, this.y - this.w / 2);
        ctx.point(this.x - this.w / 2, this.y + this.w / 2);
        ctx.point(this.x + this.w / 2, this.y + this.w / 2);
        ctx.noFill();
    }
}
