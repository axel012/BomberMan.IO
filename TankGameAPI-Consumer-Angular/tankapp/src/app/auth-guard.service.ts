import { Injectable } from '@angular/core';
import { GameAPI } from './gameAPI.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public gameAPI: GameAPI, public router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
    if(this.gameAPI.isLogedIn()){
        return of(true);
    }else{
    return this.gameAPI.checkSession().pipe(
    
      map(res=>{
        if(res){
          this.gameAPI.setLogedIn(true);
          return true;
        }else
          return false;
      }),catchError((err: HttpErrorResponse) => {
        this.router.navigate(["/login"]);
        return of(false);
      })
    );
  }   
}
  resolve():void{
    if(this.gameAPI.isLogedIn()) {
      this.router.navigate(["/game"]);
    }else{
      this.gameAPI.getLoginInfo().subscribe((res)=>{
        this.gameAPI.setLogedIn(true);
        this.router.navigate(["/game"]);
      },(err)=>{
        this.gameAPI.setLogedIn(false);
      });
    }
  }
}
