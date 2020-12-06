import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from 'buffer';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginInterface } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario;
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.usuario.uid || '';
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('id', res.usuario.uid);
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
      })
    );
  }

  login(usuario: Usuario, remember: boolean = false) {
    if (remember == true) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}/login`, usuario).pipe(
      tap((res: any) => {
        localStorage.setItem('id', res.usuario.uid);
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
      })
    );
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const { nombre, email, role, uid, img = '' } = res.usuario;
          this.usuario = new Usuario(nombre, email, '', uid, role, img);
          localStorage.setItem('token', res.token);
          return true;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }

  actualizarPerfil(data: { email: string; nombre: string }) {
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
  }
}
