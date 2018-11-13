class Tank {
    constructor(x, y) {

        this.img = Assets.get("redtank").get(0, 32 * 3, 32, 32);

        this.w = Tile.SIZE*0.8;
        this.h = Tile.SIZE*0.8;
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
        } else if (keyIsDown(DOWN_ARROW) || keyIsDown(UP_ARROW)) {
            this.xMove += (keyIsDown(UP_ARROW) === true ? 1 : (-1)) * this.linearSpeed * cos(this.rotation);
            this.yMove += (keyIsDown(UP_ARROW) === true ? 1 : (-1)) * this.linearSpeed * sin(this.rotation);
            SoundManager.Instance.stopSound('engine');
            SoundManager.Instance.playSound('movetank',true);

        }
        //90 es la z
        if(keyIsDown(90)){
            if(this.fireRateCounter > this.limitFireRate){
		    this.fireRateCounter=0;
		    let xB=this.x+cos(this.rotation)*this.w/2;
		    let yB=this.y +sin(this.rotation)*this.h/2;
		    let bullet=new Bullet(null,xB,yB,40,this.rotation,100);
		    Stage.Instance.addEntity(bullet);
		    SoundManager.Instance.stopSound('shot');
		    SoundManager.Instance.playSound('shot',false);
            }else{
	            ++this.fireRateCounter;
            }
        }


    }
    handleKeysReleased(){
        if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
            SoundManager.Instance.stopSound('movetank');
            SoundManager.Instance.playSound('engine',true);
        }
        if(keyCode === 90){
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
            /*this.rSpeed += this.rotationSpeed*(-1)+0.3*Math.sign(this.rotationSpeed);*/
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

    render() {
        push();
        translate(this.x, this.y);
        //translate(this.w/2,this.w/2);
        noFill();
        stroke(0, 255, 0);
        strokeWeight(2);
        rotate(this.rotation);
        image(this.img, -this.w / 2, -this.h / 2,this.w,this.h);
        // rect(-this.w / 4, -this.w / 4, this.w/2, this.w/2);
        stroke(0, 0, 255);
        pop();
        strokeWeight(8);
        stroke(255);
        point(this.x - this.w / 2, this.y - this.w / 2);
        point(this.x + this.w / 2, this.y - this.w / 2);
        point(this.x - this.w / 2, this.y + this.w / 2);
        point(this.x + this.w / 2, this.y + this.w / 2);
        noFill();
    }
}
