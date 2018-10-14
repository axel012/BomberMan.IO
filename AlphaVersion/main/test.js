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

function windowResized() {

   /* resizeCanvas(windowWidth * 0.9, windowHeight * 0.9);*/

    /*Stage.Instance.cvn= createCanvas(windowWidth , windowHeight );*/
    width=windowWidth;
    height=windowHeight;
    /*let x = (windowWidth -width) / 2;
    let y =(windowHeight - height)/2;*/
    Stage.Instance.cnv.position(0, 0);
    Map.onResize();
    console.log("resize");

}

function keyReleased() {

    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {

          SoundManager.Instance.stopSound('movetank');
          SoundManager.Instance.playSound('engine',true);
    }
    return false;
}

class Tank {
    constructor(x, y) {

        this.img = Assets.get("redtank").get(0, 32 * 3, 32, 32);

        this.w = this.img.width;
        this.h = this.img.height;
        this.y = y + this.w / 2;
        this.x = x + this.h/2;
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
        } else if (keyIsDown(DOWN_ARROW) || keyIsDown(UP_ARROW)) {
            this.xMove += (keyIsDown(UP_ARROW) === true ? 1 : (-1)) * this.linearSpeed * cos(this.rotation);
            this.yMove += (keyIsDown(UP_ARROW) === true ? 1 : (-1)) * this.linearSpeed * sin(this.rotation);
                SoundManager.Instance.stopSound('engine');
                SoundManager.Instance.playSound('movetank',true);

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
                colli = Map.getThereACollidable(xEvaluated, yEvaluated, this.w +5, this.h + 5);
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
        image(this.img, -this.w / 2, -this.h / 2);
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


  