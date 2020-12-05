import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._usuarioService.validarToken().pipe(
      tap((estaAutenticado) => {
        if (estaAutenticado) {
          console.log('Estas autenticado');
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
