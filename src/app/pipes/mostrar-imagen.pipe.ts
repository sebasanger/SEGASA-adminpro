import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;
@Pipe({
  name: 'mostrarImagen',
})
export class MostrarImagenPipe implements PipeTransform {
  transform(
    imgName: string,
    tipo: 'hospitales' | 'medicos' | 'usuarios'
  ): string {
    return `${baseUrl}/upload/${tipo}/${imgName}`;
  }
}
