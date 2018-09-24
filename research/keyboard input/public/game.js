let game;
$(function () {
	game = GameManager.Instance;

});

class NetworkManager {

	constructor() {
		this.socket = io();
	}

	addEventListener(eventName, func) {
		if (func !== undefined)
			this.socket.on(eventName, func);
		else
			this.socket.on(eventName);
	}

	removeListener(eventName) {
		this.socket.off(eventName);
	}

	static get Instance() {
		if (!this._intance) {
			this._intance = new NetworkManager();
		}
		return this._intance;
	}

}

class LatencyManager {

	constructor() {
		this.network = NetworkManager.Instance;
		this.handler = null;
		this.latency = 0;
		this.network.addEventListener("_pong", () => {
			this.latency = Date.now() - this.startTime;
			//console.log("ping: " +this.latency);
		});
	}

	start() {
		if (this.handler !== null)
			return;
		this.handler = setInterval(() => {
				this.startTime = Date.now();
				this.network.socket.emit('_ping');

			}, 2000);
	}

	stop() {
		clearInterval(this.handler);
		this.handler = null;
	}

	static get Instance() {
		if (!this._intance) {
			this._intance = new LatencyManager();
		}
		return this._intance;
	}

}

//MY ENUM
class Keys{
	static get LEFT() {return 65;}
	static get RIGHT() {return 68;}
	static get UP() {return 87;}
	static get DOWN() {return 83;}
	
}

class InputManager {

	
	constructor() {
		this.moving = {RIGHT:false,LEFT:false,UP:false,DOWN:false};
		//Copy 
		this.lastMove = Object.assign({}, this.moving);
		let keyHandler =  (e) => {
			e = e || window.event;
			if (e.keyCode == Keys.LEFT) {
				this.moving.LEFT = (e.type == "keydown");
			} else if (e.keyCode == Keys.RIGHT) {
				this.moving.RIGHT = (e.type == "keydown");
			}else if (e.keyCode == Keys.UP) {
				this.moving.UP = (e.type == "keydown");
			}else if (e.keyCode == Keys.DOWN) {
				this.moving.DOWN = (e.type == "keydown");
			}
			
			if(JSON.stringify(this.moving) !== JSON.stringify(this.lastMove)){ 
			this.lastMove = Object.assign({}, this.moving);
			//console.log(this.lastMove);
			NetworkManager.Instance.socket.emit("move",this.lastMove);
			}
			//NetworkManager.Instance.socket.emit("move",input);
			//this.lastMove = this.moving;
		}
		document.body.onkeydown = keyHandler;
		document.body.onkeyup = keyHandler;
		
	}
	
	
	


	static get Instance() {
		if (!this._intance) {
			this._intance = new InputManager();
		}
		return this._intance;
	}

}

class GameManager {

	constructor() {
		this.latencyManager = LatencyManager.Instance;
		this.network = NetworkManager.Instance;
		this.latencyManager.start();
		this.inputManager = InputManager.Instance;
		
		this.network.addEventListener("state",(data)=>{
			this.players = data;
			//console.log(this.players);
		})
	}
	
	update(){
		//this.inputManager.processInput();
	}

	static get Instance() {
		if (!this._intance) {
			this._intance = new GameManager();
		}
		return this._intance;
	}

}

function setup(){
	createCanvas(400,400);
}

function draw(){
	background(0);
	if(game)
		game.update();
	fill(255);
	if(game.players)
	for(let player of game.players){
		rect(player.pos.x,player.pos.y,50,50);
	}
	//if(game.pos)
		//rect(game.pos.x,game.pos.y,50,50);
}