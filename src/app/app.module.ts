import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { GameComponent } from './game/game.component';
import { AppRoutingModule } from './/app-routing.module';
import { UuidService } from './services/uuid.service';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';
import { SocketService } from './socket.service';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GameComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlayerService, UuidService, GameService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
