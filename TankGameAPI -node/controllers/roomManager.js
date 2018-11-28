
class RoomManager{

	constructor(){
		this._rooms = {};
		this._lastRoomID = 0;
	}

	static get Instance(){
		if(this._instance === undefined){
			this._instance = new RoomManager();
		}
		return this._instance;
	}

	listRooms(){
		return this._rooms;
	}
	
	addRoom(playerData){
		this._lastRoomID++;
		this._rooms[this._lastRoomID] = new Room(this._lastRoomID,playerData);
		return this._rooms[this._lastRoomID];
	}

	join(roomID,playerData){
		var room = this._rooms[roomID];
		if(room){
			return room.join(playerData);
		}else{
			return {error:"room not found"};
		}
	}
}

class Room{
	constructor(id,owner){
		this._owner = owner.id;
		this._players = {};
		this.join(owner);
		this._roomID = id;
	}
	//game instance
	_isFull(){
		return false;
	}

	join(player){
		//notify join
		if(this._players[player.id]){
			return {error:"already in room"};
		}
		if(this._isFull()){
			return {error:"room full"};
		}

		let roomIndex = player.roomIndex || -1; 
		if(roomIndex != -1 && roomIndex != this._roomID){
			return {error:`already in room nº ${roomIndex}`}
		}else if(roomIndex == -1){
			player.roomIndex = this._roomID;
		}

//		if(player.id === this._owner)
//			return '';
		 this._players[player.id] = player.userdata;
		 return player.userdata;
	}

	leave(player){
		//notify leave
		this._players.splice(this._players.indexOf(player),1);
	}
}

module.exports = RoomManager.Instance;