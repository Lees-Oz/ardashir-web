import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public alert(): void {
    console.log('yo');
  }

  constructor() { }

  ngOnInit() {
  }

}
