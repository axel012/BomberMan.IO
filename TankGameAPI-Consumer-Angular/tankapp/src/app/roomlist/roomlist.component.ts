import { Component, OnInit } from '@angular/core';
import { GameAPI } from '../gameAPI.service';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomListComponent implements OnInit {

  constructor(private gameAPI:GameAPI) { }
  salas:any;

  ngOnInit() {
  this.gameAPI.getRooms().subscribe((res)=>{
    this.salas = res;
    console.log(this.salas);
  },(error)=>{
    
  });
  }

  getSalas(){
    let rooms = [];
    if(!this.salas)
      return rooms;
    Object.keys(this.salas).forEach((key)=>{
      var sala = this.salas[key];
      sala.playerCount = Object.keys(sala._players).length;
      console.log(sala);
      rooms.push(sala);
    });
    return rooms;
  }

}
