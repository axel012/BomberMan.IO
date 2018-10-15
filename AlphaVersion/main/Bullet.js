class Bullet {
    constructor(img, x, y, speed, angle, damage) {
        this.img = img;
        if(this.img!==null){
            this.w = this.img.width;
            this.h = this.img.height;
        }
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.damage = damage;
        this.xMove = speed * cos(angle);
        this.yMove = speed * sin(angle);

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
            point(-2.5, -2.5,5, 5);

        }
        pop();
    }

    update() {
        this.x += this.xMove;
        this.y += this.yMove;
    }
}