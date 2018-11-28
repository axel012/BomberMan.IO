import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GameAPI } from './gameAPI.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  game:any;

  constructor(private gameAPI:GameAPI){
    this.game = this.gameAPI;
  }
  
}
