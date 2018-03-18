import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [GameService, PlayerService]
})
export class LandingComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.playerService.getLocalPlayer());
  }

  requestNewGame() {
    this.gameService.requestNewGame().subscribe(() => {
      this.gameService.getMyGame().subscribe(myGame => {
        console.log(myGame);
        this.router.navigate([`/game/${myGame.gameId}`]);
      })
    });
  }
}
