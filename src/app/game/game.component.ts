import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { BackgammonGame } from '../domain/backgammon-game';
import { Player } from '../domain/player';
import { Subject } from 'rxjs';
import { GameMessage } from '../contracts/game-message';
import { MyGame } from '../contracts/my-game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private gameService: GameService,
    private playerService: PlayerService,
    private router: Router) { }

    gameId: string;
    game: BackgammonGame = null;
  
    currentPlayer: Player;
    oppositePlayer: Player;
  
    ws: WebSocket;
  
    ngOnInit() {
      this.currentPlayer = this.playerService.getLocalPlayer();
      this.gameId = this.route.snapshot.paramMap.get('id');

      

      if(!this.gameId) {
        
        this.gameService.getMyGame().subscribe(value => {
          
          if (value.gameId) {
            this.router.navigate([`/game/${value.gameId}`]);
          } else {
            this.gameService.requestNewGame().subscribe(e => {
              this.gameService.getMyGame().subscribe(myGame => {
                if(myGame.gameId) {
                  this.router.navigate([`/game/${myGame.gameId}`]);
                } else {
                  console.error("Can't find my game after new was requested.");
                }
              })
            });
          }
        });
      } else {
        this.gameService.getGame(this.gameId).subscribe(game => {
          this.game = game;
          this.connectWebSocket(game.id, this.currentPlayer.id);
          if (this.game.status === "waitingPartner" && this.game.whitePlayerId !== this.currentPlayer.id) {
            this.gameService.joinGame(this.gameId).subscribe(() => {
              console.log("Joined game");
            });
          } else if (this.game.status === "started") {
            this.oppositePlayer = {id: this.game.whitePlayerId == this.currentPlayer.id ? this.game.blackPlayerId : this.game.whitePlayerId};
          }
        }, error => {
          console.error(error);
          this.game = null;
        });
      }
    }
  
    loadGame(): void {
      
    }

    getMyGame(callback: (value: MyGame) => void): void {
      
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
