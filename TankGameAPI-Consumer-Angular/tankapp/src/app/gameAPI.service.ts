import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameAPI {

  constructor(private http:HttpClient) { }
  
  logedIn;
  _session = {};

  getRooms(){
    return this.http.get("http://localhost:3000/api/game/room",{withCredentials:true});
  }

  


  getScoreBoard(){
    return this.http.get("localhost:8000/api/get/scoreboard");
  }

  createRoom(){
    return this.http.get("http://localhost:3000/api/game/room/create",{withCredentials:true});
  }

  joinRoom(roomid){
    return this.http.get(`localhost:3000/api/join/${roomid}`);
  }
  
   login(username,password){
    return this.http.post("http://localhost:3000/api/login",{
      username,
      password
    },{observe:'response',withCredentials:true});
  }

  public deleteSessionData(param){
    delete this._session[param];
  }

  public checkSession(){
    return this.http.get(`http://localhost:3000/api/players/current`,{withCredentials:true});
  }

  public getPlayerInfo(playerID){
    return this.http.get(`http://localhost:3000/api/players/${playerID}`);
  }

  public logout(){
    return this.http.get("http://localhost:3000/api/logout",{withCredentials:true});
  }

  public getLoginInfo(){
    return this.http.get("http://localhost:3000/api/login",{withCredentials:true});
  }


  public setSessionData(param,value){
    this._session[param] = value;
  }

  public getSessionData(param){
    return this._session[param];
  }

  public isLogedIn(){
    return this.logedIn;
  }

  public setLogedIn(val){
    this.logedIn = val;
  }

}
