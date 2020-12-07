import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];
  public desde: number = 0;
  public viendo: number = this.desde + 5;
  public cargando: boolean = true;
  public totalPorPagina: number = 10;
  public imgSubs: Subscription;
  constructor(
    private _modalImagenService: ModalImagenService,
    private _usuarioService: UsuarioService,
    private _busquedaService: BusquedasService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this._modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarUsuarios();
      });
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService
      .cargarUsuarios(this.desde, this.totalPorPagina)
      .subscribe(({ total, usuarios, viendo }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.viendo = this.desde + viendo;
        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    }
    if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }
  buscar(filtro: string) {
    if (filtro.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this._busquedaService.filtrar('usuarios', filtro).subscribe((res) => {
      this.usuarios = res;
    });
  }

  abrirModalImagen(usuario: Usuario) {
    this._modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

  cambiarRole(usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  eliminarUsuario(usuario: Usuario, indice: number) {
    if (usuario.uid === this._usuarioService.uid) {
      Swal.fire('Error', `No te puedes eliminar a ti mismo`, 'error');
      return;
    }
    Swal.fire({
      title: 'Esta seguro que desea eliminar este usuario?',
      text: 'Esta a punto de eliminar al usuario ' + usuario.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarUsuario(usuario).subscribe(
          (res) => {
            this.cargarUsuarios();
            Swal.fire(
              'Usuario eliminado',
              `El usuario ${usuario.nombre} fue eliminado exitosamente`,
              'success'
            );
          },
          (err) => {
            Swal.fire(
              'Error al eliminar',
              `El usuario ${usuario.nombre} no se pudo eliminar`,
              'error'
            );
          }
        );
      }
    });
  }
}
