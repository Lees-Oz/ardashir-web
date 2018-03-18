import { Component, OnInit } from '@angular/core';
import { BoardPoint } from '../domain/boardpoint';
import { BackgammonGame } from '../domain/backgammon-game';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService, PlayerService]
})
export class GameComponent implements OnInit {

  game: BackgammonGame;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService) { }

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    var gameId = this.route.snapshot.paramMap.get('id')
    this.game = this.gameService.getGame(gameId);
  }
}
