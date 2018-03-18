import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackgammonGame } from '../domain/backgammon-game';
import { PlayerService } from './player.service';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { MyGame } from '../contracts/my-game';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GameService {
  
  constructor(private http: HttpClient, private playerService: PlayerService) {}

  getGame(id: string): Observable<BackgammonGame> {
    return this.http.put<BackgammonGame>('/query/GetGameById', {gameId: id});
  }

  requestNewGame(): Observable<any> {
    return this.http.post('/command/RequestNewGame', {playerId: this.playerService.getLocalPlayer().id});
  }

  getMyGame(): Observable<MyGame> {
    return this.http.put<MyGame>('/query/GetMyGame', {playerId: this.playerService.getLocalPlayer().id});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
