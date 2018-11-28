import { Component, OnInit } from '@angular/core';
import { GameAPI } from '../gameAPI.service';

@Component({
  selector: 'app-gamemenu',
  templateUrl: './gamemenu.component.html',
  styleUrls: ['./gamemenu.component.css']
})
export class GameMenuComponent implements OnInit {

  constructor(private gameAPI:GameAPI) { }
  userdata:any;

  ngOnInit() {
    this.userdata = this.gameAPI.getSessionData("userdata");
    console.log(this.userdata);
  }

}
