import { Component, OnInit } from '@angular/core';
import { BoardPoint } from '../domain/boardpoint';
import { BackgammonGame } from '../domain/backgammon-game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../domain/player';
import { SocketService } from '../socket.service';
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
    private playerService: PlayerService,
    private socketService: SocketService) { }

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

  ngOnInit() {
    this.gameSubject = <Subject<GameMessage>>this.socketService.connect()
      .map((response: MessageEvent): GameMessage => {
        let data = JSON.parse(response.data);
				return {
					playerId: data.playerId,
					gameId: data.gameId,
					action: data.action
				}
      });

    this.currentPlayer = this.playerService.getLocalPlayer();
    this.loadGame();

    //this.gameSubject.
  }

  loadGame(): void {
    this.gameService.getGame(this.gameId).subscribe(game => {
      this.game = game;
      this.oppositePlayer =  {id: this.game.whitePlayerId == this.currentPlayer.id ? this.game.blackPlayerId : this.game.whitePlayerId}
    }, error => {
      this.game = null;
    });
  }

  join(): void {
    // this.gameSubject.next({playerId: this.playerService.getLocalPlayer().id, 
    //   gameId: this.gameId,
    // action: 'joined'});

    this.gameService.joinGame(this.gameId).subscribe(() => {
      this.loadGame();
    });
  }
}
