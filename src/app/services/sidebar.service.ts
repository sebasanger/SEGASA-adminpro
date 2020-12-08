import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private router: Router, private _usuarioService: UsuarioService) {
    this.cargarMenu();
  }
  menu: any[] = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    setTimeout(() => {
      if (this.menu.length === 0) {
        this._usuarioService.logout();
        this.router.navigateByUrl('/login');
      }
    }, 1000);
  }

  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/' },
  //       { titulo: 'Progress Bar', url: '/dashboard/progress' },
  //       { titulo: 'Grafica', url: '/dashboard/grafica1' },
  //       { titulo: 'Promesas', url: '/dashboard/promesas' },
  //       { titulo: 'Rxjs', url: '/dashboard/rxjs' },
  //     ],
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios' },
  //       { titulo: 'Hospitales', url: 'hospitales' },
  //       { titulo: 'Medicos', url: 'medicos' },
  //     ],
  //   },
  // ];
}
