import { Component, OnInit, Input } from '@angular/core';
import { BoardPoint } from '../domain/boardpoint';
import { Dice } from '../domain/dice';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() points: BoardPoint[];
  @Input() dice: Dice;

  constructor() { }

  ngOnInit() {
  }

}
