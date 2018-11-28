import { Component, OnInit } from '@angular/core';
import { GameAPI } from '../gameAPI.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private gameAPI:GameAPI,private router:Router) { }

  ngOnInit() {
    this.gameAPI.logout().subscribe((response)=>{
      console.log(response);
      this.gameAPI.deleteSessionData("userdata");
      this.gameAPI.setLogedIn(false);
      this.router.navigate(["/login"]);
    },(error)=>{
      this.gameAPI.deleteSessionData("userdata");
      this.gameAPI.setLogedIn(false);
      this.router.navigate(["/login"]);
    });
  }

}
