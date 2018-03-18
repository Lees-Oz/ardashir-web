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


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlayerService, UuidService, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
