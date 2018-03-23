import { Component, OnInit } from '@angular/core';
import { BoardPoint } from '../domain/boardpoint';
import { BackgammonGame } from '../domain/backgammon-game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../domain/player';
import { Subject } from 'rxjs';
import { GameMessage } from '../contracts/game-message';

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

  game: BackgammonGame = { 
    id: null, 
    points: [],
    whitePlayerId: null,
    blackPlayerId: null
   };
  gameId: string = this.route.snapshot.paramMap.get('id');

  currentPlayer: Player;
  oppositePlayer: Player;
  
  gameSubject: Subject<GameMessage>;

  ws: WebSocket;

  ngOnInit() {

    this.currentPlayer = this.playerService.getLocalPlayer();
    this.loadGame();
  }

  loadGame(): void {
    this.gameService.getGame(this.gameId).subscribe(game => {
      this.game = game;
      this.oppositePlayer =  {id: this.game.whitePlayerId == this.currentPlayer.id ? this.game.blackPlayerId : this.game.whitePlayerId};
      this.connectWebSocket(game.id, this.currentPlayer.id);
    }, error => {
      this.game = null;
    });
  }

  connectWebSocket(gameId: string, playerId: String): void {
    if(this.ws && this.ws.OPEN) {
      return;
    }

    this.ws = new WebSocket('ws://localhost:4567/ws?gameId=' + gameId + '&playerId=' + playerId);
    this.ws.onopen = function(e) {
      console.log('open ' + JSON.stringify(e));
    }.bind(this);

    this.ws.onmessage = function(e) {
      console.log('message ' + JSON.stringify(e.data));
      this.loadGame();
    }.bind(this);
  }

  join(): void {
    this.gameService.joinGame(this.gameId).subscribe(() => {
      let joinedMessage: GameMessage = {gameId: this.gameId, playerId: this.currentPlayer.id, action: 'joined'}
      this.ws.send(JSON.stringify(joinedMessage));
      this.loadGame();
    });
  }
}
