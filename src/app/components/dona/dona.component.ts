import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  @Input() public titulo: string = 'Dona';
  // Doughnut
  @Input() public doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  @Input() public doughnutChartData: MultiDataSet = [[350, 450, 100]];
  @Input() public doughnutChartType: ChartType = 'doughnut';

  @Input() public colors: Color[] = [
    { backgroundColor: ['cyan', 'grey', 'black'] },
  ];

  constructor() {}

  ngOnInit(): void {}

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
