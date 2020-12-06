import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';
  constructor(
    private formBuider: FormBuilder,
    private _usuarioService: UsuarioService,
    private _uploadService: FileUploadService
  ) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.formBuider.group({
      nombre: [
        this.usuario.nombre,
        [Validators.required, Validators.minLength(2)],
      ],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizar() {
    if (this.perfilForm.invalid) {
      return;
    }
    this._usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(
      (res: any) => {
        const { nombre, email } = res.usuario;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire(
          'Cambios actualizados',
          'Los cambiosse guardaron con exito',
          'success'
        );
      },
      (err) => {
        Swal.fire('Ocurrio un error', err.error.mensaje, 'error');
      }
    );
  }

  cambiarImagen(file: File) {
    if (!file) {
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
    this.imagenSubir = file;
  }

  subirImagen() {
    this._uploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire(
          'Avatar cambiado',
          'LLa imagen se cambio con exito',
          'success'
        );
      })
      .catch((err) => {
        Swal.fire('Error', 'no se pudo subir la imagen', 'error');
      });
  }
}
