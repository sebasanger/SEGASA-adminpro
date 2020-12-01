import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  progreso1: number = 40;
  progreso2: number = 80;

  getProgreso1() {
    return `${this.progreso1}%`;
  }
  getProgreso2() {
    return `${this.progreso2}%`;
  }
}
