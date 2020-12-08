import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarImagenPipe } from './mostrar-imagen.pipe';

@NgModule({
  declarations: [MostrarImagenPipe],
  exports: [MostrarImagenPipe],
  imports: [CommonModule],
})
export class PipesModule {}
