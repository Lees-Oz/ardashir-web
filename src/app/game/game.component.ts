import { Component, OnInit } from '@angular/core';
import { BoardPoint } from '../domain/boardpoint';
import { BackgammonGame } from '../domain/backgammon-game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: BackgammonGame;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGame();
  }

  getGame(): void {
    this.game = { 
      id: this.route.snapshot.paramMap.get('id'),
      points: [
        { index: 0, checkersCount: 15, playerColor: 'WHITE'},
        { index: 1, checkersCount: 0, playerColor: 'WHITE'},
        { index: 2, checkersCount: 0, playerColor: 'WHITE'},
        { index: 3, checkersCount: 0, playerColor: 'WHITE'},
        { index: 4, checkersCount: 0, playerColor: 'WHITE'},
        { index: 5, checkersCount: 0, playerColor: 'WHITE'},
        { index: 6, checkersCount: 0, playerColor: 'WHITE'},
        { index: 7, checkersCount: 0, playerColor: 'WHITE'}
      ]
    }
  }
}
