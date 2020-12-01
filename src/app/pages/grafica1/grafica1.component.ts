import { Component, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  constructor() {}

  public etiquetas: Label[] = ['Cursos', 'Tutorias', 'Programas'];

  public data: MultiDataSet = [[20, 40, 60]];

  public colores: Color[] = [{ backgroundColor: ['red', 'orange', 'yellow'] }];

  titulo2: string = '';

  public etiquetas2: Label[] = ['motos', 'autos', 'camiones'];

  public data2: MultiDataSet = [[120, 60, 12]];

  public colores2: Color[] = [{ backgroundColor: ['lime', 'gold', 'brown'] }];

  ngOnInit(): void {}
}
