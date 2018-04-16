import { Component, OnInit, Input } from '@angular/core';
import { BoardPoint } from '../domain/boardpoint';
import { Dice } from '../domain/dice';
import { BoardConfig } from '../domain/game-config';
import { PlayerColor } from '../domain/player-color.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  private config: BoardConfig = {
    checkersCount: 15,
    pointsCount: 24
  } 

  private topPoints: BoardPoint[] = [];
  private bottomPoints: BoardPoint[] = [];
  
  @Input() playerColor: PlayerColor;

  @Input()
  set points(points: BoardPoint[]) {
    console.log("Board: Set points - " + points);

    if(!points) {
      return;
    }

    console.log(this.playerColor.toString());

    //let a: BoardPoint[] = JSON.parse('[{"index":0,"checkersCount":10,"playerColor":"WHITE"},{"index":1,"checkersCount":1,"playerColor":"WHITE"},{"index":2,"checkersCount":1,"playerColor":"BLACK"},{"index":3,"checkersCount":2,"playerColor":"WHITE"},{"index":4,"checkersCount":0,"playerColor":null},{"index":5,"checkersCount":3,"playerColor":"BLACK"},{"index":6,"checkersCount":0,"playerColor":null},{"index":7,"checkersCount":1,"playerColor":null},{"index":8,"checkersCount":0,"playerColor":null},{"index":9,"checkersCount":0,"playerColor":null},{"index":10,"checkersCount":0,"playerColor":null},{"index":11,"checkersCount":1,"playerColor":"WHITE"},{"index":12,"checkersCount":8,"playerColor":"BLACK"},{"index":13,"checkersCount":2,"playerColor":"BLACK"},{"index":14,"checkersCount":0,"playerColor":null},{"index":15,"checkersCount":0,"playerColor":null},{"index":16,"checkersCount":2,"playerColor":"WHITE"},{"index":17,"checkersCount":3,"playerColor":"WHITE"},{"index":18,"checkersCount":1,"playerColor":"BLACK"},{"index":19,"checkersCount":0,"playerColor":null},{"index":20,"checkersCount":1,"playerColor":"BLACK"},{"index":21,"checkersCount":0,"playerColor":null},{"index":22,"checkersCount":0,"playerColor":null},{"index":23,"checkersCount":0,"playerColor":null}]');

    if(this.playerColor === PlayerColor.White) {
      console.log("is white");      

      this.bottomPoints = points.slice(0, this.config.pointsCount / 2);
      this.topPoints = points.slice(this.config.pointsCount / 2).reverse();
    } else {
      console.log("is black");
      this.bottomPoints = points.slice(this.config.pointsCount / 2);
      this.topPoints = points.slice(0, this.config.pointsCount / 2).reverse();
    }
  }

  public getRange(i: number) {
    return Array.from(Array(i).keys());
  }

  constructor() { }

  ngOnInit() {
  }

}
