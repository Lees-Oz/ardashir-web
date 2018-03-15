import { Component, OnInit } from '@angular/core';
import { BoardPoint } from '../boardpoint';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  point: BoardPoint = {
    index: 0,
    checkersCount: 3,
    playerColor: 'WHITE'  
  }

  constructor() { }

  ngOnInit() {
    this.point.checkersCount = 2;
  }

}
