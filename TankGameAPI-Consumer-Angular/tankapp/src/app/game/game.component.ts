import { Component, OnInit } from '@angular/core';
import { GameAPI } from '../gameAPI.service';


@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  constructor(private gameAPI:GameAPI){

  }

  ngOnInit() {
    this.gameAPI.createRoom().subscribe((res)=>{
      console.log(res);
    },(error)=>{
      console.log(error);
    });
  }
  
  
}
