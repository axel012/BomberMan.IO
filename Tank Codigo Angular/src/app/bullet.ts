import { Stage } from "./stage";
import { Map } from "./map";
import { Tile, TileManager } from "./tile";

export class Bullet {
        img:any;
        x:number;
        y:number;
        w:number;
        h:number;
        speed:number;
        angle:number;
        damage:number;
        xMove:number;
        yMove:number;
        dead:boolean;

        constructor(img, x, y, speed, angle, damage) {
            this.img = img;
            if (this.img !== null) {
                this.w = this.img.width;
                this.h = this.img.height;
            } else {
                this.w = 5;
                this.h = 5;
            }
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.angle = angle;
            this.damage = damage;
            this.xMove = speed * Math.cos(angle);
            this.yMove = speed * Math.sin(angle);
            this.dead = false;
        }
    
        render(ctx) {
            ctx.push();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            if (this.img !== null) {
                ctx.image(this.img, -this.w / 2, -this.h / 2);
            } else {
                ctx.stroke(255, 0, 0);
                ctx.point(-this.w / 2, -this.h / 2, this.x, this.y);
            }
            ctx.pop();
            //check bounds
         /*   if(this.x >= ctx.width || this.x < 0 || this.y >= ctx.height || this.y < 0){
                Stage.Instance.destroyEntity(this);
            }*/
        }
    
        update(ctx) {
            let colli = null;
            let distancia = Math.sqrt(
                Math.pow(this.xMove, 2) + Math.pow(this.yMove, 2),
            );
            for (let i = 0; i < distancia; i += 3) {
                let xEvaluated = this.x + i * Math.cos(this.angle);
                let yEvaluated = this.y + i * Math.sin(this.angle);
                colli = Map.getThereACollidable(xEvaluated, yEvaluated, this.w, this.h);
                if (colli !== null) {
                    colli.resistance -= this.damage;
                    if (colli.walkable()) {
                        /*
                        Map.backgroundImage.blend(TileManager.getTileImage(1), 0, 0, Tile.SIZE, Tile.SIZE, 2 * Tile.SIZE, 2 * Tile.SIZE, Tile.SIZE, Tile.SIZE, BLEND);
                        */
                        let idimg = Map.map3DTiles[Math.trunc(colli.posX / Tile.SIZE)][Math.trunc(colli.posY / Tile.SIZE)][1].idImg; 
                        if ( idimg >=0) {
                            Map.backgroundImage.blend(TileManager.getTileImage(idimg),0,0,Tile.SIZE,Tile.SIZE,colli.posY,colli.posX,Tile.SIZE,Tile.SIZE,ctx.BLEND);
                        }
                        colli.idImg = -1;
                    }
                  //  this.xMove = i * Math.cos(this.angle);
                   // this.yMove = i * Math.sin(this.angle);
                    Stage.Instance.destroyEntity(this);
                    //this.exploted = true;
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

