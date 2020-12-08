import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}
  get token() {
    return localStorage.getItem('token') || '';
  }
  get headerToken() {
    return { headers: { 'x-token': this.token } };
  }

  filtrar(tipo: 'usuarios' | 'medicos' | 'hospitales', filtro: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${filtro}`;
    return this.http.get(url, this.headerToken).pipe(
      map((res: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(res.resultado);

          case 'medicos':
            return res.resultado;

          default:
            break;
        }
      })
    );
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map((usuario) => {
      return new Usuario(
        usuario.nombre,
        usuario.email,
        '',
        usuario.uid,
        usuario.role,
        usuario.img
      );
    });
  }
}
