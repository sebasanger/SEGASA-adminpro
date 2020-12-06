import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  public imgUrl = '';
  public usuario: Usuario;
  menuItems: any[];
  constructor(
    private _usuarioService: UsuarioService,
    private _sidebarService: SidebarService
  ) {
    this.imgUrl = _usuarioService.usuario.getImagen;
    this.menuItems = _sidebarService.menu;
    this.usuario = _usuarioService.usuario;
  }
  ngOnInit(): void {}
}
