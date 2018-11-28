import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent  {

  @Input()sala:any;
  


  constructor() { }

}
