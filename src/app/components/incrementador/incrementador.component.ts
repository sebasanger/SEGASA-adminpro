import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  constructor() {}

  @Input() progreso: number = 30;

  @Input() btnClass: string = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {}

  cambioDeValor(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      console.log('Supera el 100');
      this.progreso = 100;
      this.valorSalida.emit(100);
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      console.log('Menor que cero');

      this.progreso = 0;
      this.valorSalida.emit(0);
      return;
    }

    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
    return;
  }
}
