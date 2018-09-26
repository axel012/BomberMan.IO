const EntityMod = require("./Entity/Entity.js");
const Player = EntityMod.Player;
const Bomb = EntityMod.Bomb;
const Explosion = EntityMod.Explosion;

class Stage{
    
    static get Instance() {
        if (this.instance == undefined) {
            this.instance = new Stage();
        }
        return this.instance;
    }

    constructor(){
        this.players = [];
        this.bombs = [];	
		this.explosions = [];
    }
    
    addEntity(e){
        if(e instanceof Player){
            this.players.push(e)
        }
	   if(e instanceof Bomb){
            this.bombs.push(e);
        }
		if(e instanceof Explosion){
            this.explosions.push(e);
        }
    }

    removeEntity(e){
        if(e instanceof Player){
            this.players.splice(this.players.indexOf(e), 1);
        }
        if(e instanceof Bomb){
            this.bombs.splice(this.bombs.indexOf(e), 1);
        }
		if(e instanceof Explosion){
			this.explosions.splice(this.explosions.indexOf(e), 1);
		}
    }

    update(dt){
        for(let p of this.players){
            p.update(dt);
        }
        for(let b of this.bombs){
            b.update(dt);
        }
		
		 for(let e of this.explosions){
            e.update(dt);
        }
    }

}

module.exports = Stage.Instance;