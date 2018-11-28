var mongoose = require('mongoose');
var Session = mongoose.model('sessions');

class SessionManager{

	constructor(){
		this._sessions = {};
	}

	static get Instance(){
		if(this._instance === undefined){
			this._instance = new SessionManager();
		}
		return this._instance;
	}
	
	addSession(playerID,cb,cberr){
		Session.findOneAndRemove({playerid:playerID}).then((data)=>{
			let session = new Session({playerid:playerID});
				console.log("new session");
				if(data){
				console.log(data["token"]);
					delete this._sessions[data["token"]];
				}
				
			session.save(cb);
		}).catch(function(err){
			cberr(err);
		});
	}

	 getSession(token,cb){
		if(this._sessions[token]===undefined){
			 Session.findOne({token:token}).then((data)=>{
				 if(data === null){
					 cb(null);
					 return;
				 }
				this._sessions[token] = {playerid:data.playerid,expire:data.expire};
				cb(this._sessions[token]);
		}).catch((err)=>{
			cb(err);
		});
		}else{
			cb(this._sessions[token]);
		}
		
	}

	getSessions(){
		return Session.find({});		
	}
}

module.exports = SessionManager.Instance;