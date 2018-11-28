import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GameAPI } from '../gameAPI.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Component({
  selector: 'loginform',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private gameAPI: GameAPI,private router:Router) { }

  errorCode:Number;
  logedin:boolean;

  ngOnInit() {
  }

  login(frm:NgForm){
   this.gameAPI.login(frm.value.user,frm.value.pass).subscribe((response)=>{
   this.errorCode = response.status;
   this.logedin = true;
   this.gameAPI.setLogedIn(true);
   this.gameAPI.setSessionData("userdata",response.body);
   this.router.navigate(["/game"]);
   },(error)=>{
    this.errorCode = error.status;
   });
  }
}
