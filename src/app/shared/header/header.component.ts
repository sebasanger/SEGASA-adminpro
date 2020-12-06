import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  public imgUrl = '';
  constructor(private _usuarioService: UsuarioService, private router: Router) {
    this.imgUrl = _usuarioService.usuario.getImagen;
    this.usuario = _usuarioService.usuario;
  }
  logout() {
    this._usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {}
}
