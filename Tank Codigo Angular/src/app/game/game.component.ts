import { Component, OnInit } from '@angular/core';
import {Stage} from '../stage';
declare var p5:any;


@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { 
    new p5(this.sketch);
  }

  sketch =(ctx:any)=>{
    ctx.setup = ()=>{
      Stage.Instance.initialize(ctx);
      console.log(ctx);
    }

    ctx.preload = ()=>{
      Stage.Instance.preload(ctx);
    }

    ctx.draw = ()=>{
      //Stage.Instance.update();
      Stage.Instance.render(ctx);
    }
  }

  ngOnInit() {
    
  }

}
