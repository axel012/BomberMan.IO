import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';

import {GameMenuComponent} from './gamemenu/gamemenu.component';

import {RoomListComponent} from './roomlist/roomlist.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';
import {RoomComponent} from './room/room.component';

import {FormsModule, DefaultValueAccessor} from '@angular/forms';
import { AuthGuardService } from './auth-guard.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    RoomListComponent,
    ScoreboardComponent,
    GameMenuComponent,
    RoomComponent,
    LogoutComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
	  HttpClientModule,
    RouterModule.forRoot([
      {'path': 'login', 'component': LoginComponent,resolve:[AuthGuardService]},
      {'path': 'game/newGame', 'component': GameComponent,canActivate: [AuthGuardService]},
      {'path': 'game/rooms', 'component': RoomListComponent,canActivate: [AuthGuardService]},
      {'path': 'game/scoreboard', 'component': ScoreboardComponent,canActivate: [AuthGuardService]},
      {'path': 'game', 'component': GameMenuComponent,canActivate: [AuthGuardService]},
      {'path': 'logout','component':LogoutComponent},
      { path: '**', redirectTo: 'game' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
