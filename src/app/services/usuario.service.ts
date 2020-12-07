import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.inteface';
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

  get headerToken() {
    return { headers: { 'x-token': this.token } };
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
    return this.http.get(`${base_url}/login/renew`, this.headerToken).pipe(
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
    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headerToken
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
  }

  cargarUsuarios(desde: number = 0, total: number = 5) {
    const url = `${base_url}/usuarios?desde=${desde}&total=${total}`;
    return this.http.get<CargarUsuarios>(url, this.headerToken).pipe(
      map((res) => {
        const usuarios = res.usuarios.map((user) => {
          return new Usuario(
            user.nombre,
            user.email,
            '',
            user.uid,
            user.role,
            user.img
          );
        });
        return { usuarios, total: res.total, viendo: res.viendo };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headerToken
    );
  }
}
