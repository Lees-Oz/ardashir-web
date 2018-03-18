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

  getGame(id: string): BackgammonGame {
    return { 
      id: id,
      points: [
        { index: 0, checkersCount: 15, playerColor: 'WHITE'},
        { index: 1, checkersCount: 0, playerColor: 'Black'},
        { index: 2, checkersCount: 0, playerColor: 'WHITE'},
        { index: 3, checkersCount: 0, playerColor: 'WHITE'},
        { index: 4, checkersCount: 0, playerColor: 'WHITE'},
        { index: 5, checkersCount: 0, playerColor: 'WHITE'},
        { index: 6, checkersCount: 0, playerColor: 'WHITE'},
        { index: 7, checkersCount: 0, playerColor: 'WHITE'},
        { index: 8, checkersCount: 0, playerColor: 'WHITE'},
        { index: 9, checkersCount: 0, playerColor: 'WHITE'},
        { index: 10, checkersCount: 0, playerColor: 'WHITE'},
        { index: 11, checkersCount: 0, playerColor: 'WHITE'},
        { index: 12, checkersCount: 0, playerColor: 'WHITE'},
        { index: 13, checkersCount: 0, playerColor: 'WHITE'},
        { index: 14, checkersCount: 0, playerColor: 'WHITE'},
        { index: 15, checkersCount: 0, playerColor: 'WHITE'},
        { index: 16, checkersCount: 0, playerColor: 'WHITE'},
        { index: 17, checkersCount: 0, playerColor: 'WHITE'},
        { index: 18, checkersCount: 0, playerColor: 'WHITE'},
        { index: 19, checkersCount: 0, playerColor: 'WHITE'},
        { index: 20, checkersCount: 0, playerColor: 'WHITE'},
        { index: 21, checkersCount: 0, playerColor: 'WHITE'},
        { index: 22, checkersCount: 0, playerColor: 'WHITE'},
        { index: 23, checkersCount: 0, playerColor: 'WHITE'}
      ]
    }
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
