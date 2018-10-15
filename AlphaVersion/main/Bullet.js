class Bullet {
    constructor(img, x, y, speed, angle, damage) {
        this.img = img;
        if(this.img!==null){
            this.w = this.img.width;
            this.h = this.img.height;
        }else{
            this.w = 5;
            this.h = 5;
        }
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.damage = damage;
        this.xMove = speed * cos(angle);
        this.yMove = speed * sin(angle);
        this.exploted=false;

    }

    render() {
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        if(this.img !==null){
            image(this.img, -this.w / 2, -this.h / 2);
        }
        else{
            stroke(255, 0, 0);
            point(-this.w / 2, -this.h / 2,this.x,this.y);

        }
        pop();
    }

    update() {
        let colli=null;
        let distancia=Math.sqrt(Math.pow(this.xMove,2)+Math.pow(this.yMove,2));
        for(let i=0;i<distancia;i+=3){
            let xEvaluated = this.x+i*cos(this.angle);
            let yEvaluated = this.y+i*sin(this.angle);
            colli = Map.getThereACollidable(xEvaluated, yEvaluated, this.w , this.h );
            if(colli!==null){
                colli.resistance-=this.damage;
                this.xMove=i*cos(this.angle);
                this.yMove=i*sin(this.angle);
                this.exploted=true;
                break;
            }
        }
        /* colli = Map.getThereACollidable(xEvaluated, yEvaluated, this.w , this.h );*/
        /*if (colli === null) {*/


            this.x += this.xMove;
            this.y += this.yMove;
        /*}else{
            this.exploted=true;
        }*/
    }
}