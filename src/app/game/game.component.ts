import { Component, OnInit } from '@angular/core';
import { BoardPoint } from '../domain/boardpoint';
import { BackgammonGame } from '../domain/backgammon-game';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../domain/player';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [GameService, PlayerService]
})
export class GameComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService) { }

  gameId: string = this.route.snapshot.paramMap.get('id');
  me: Player;
  
  game: BackgammonGame = { id: null, points: [] };

  ngOnInit() {
    this.me = this.playerService.getLocalPlayer();
    this.loadGame();
  }

  loadGame(): void {
    this.gameService.getGame(this.gameId).subscribe(game => {
      this.game = game;
    });
  }

  join(): void {
    this.gameService.joinGame(this.gameId).subscribe(() => {
      this.loadGame();
    });
  }
}
